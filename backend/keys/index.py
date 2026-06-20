import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Выдача бесплатного ключа Happ и управление ключами (админка)"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Secret',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    method = event.get('httpMethod', 'GET')

    # GET — выдать один свободный ключ
    if method == 'GET':
        cur.execute(
            "UPDATE happ_keys SET is_used = TRUE, used_at = NOW() "
            "WHERE id = (SELECT id FROM happ_keys WHERE is_used = FALSE ORDER BY id LIMIT 1) "
            "RETURNING key_value"
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        if not row:
            return {'statusCode': 404, 'headers': cors, 'body': json.dumps({'error': 'Keys are over'}, ensure_ascii=False)}
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'key': row[0]}, ensure_ascii=False)}

    # POST — добавить ключи (только для админа)
    if method == 'POST':
        secret = event.get('headers', {}).get('X-Admin-Secret', '')
        if secret != os.environ.get('ADMIN_SECRET', ''):
            return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'error': 'Нет доступа'})}

        body = json.loads(event.get('body') or '{}')
        keys = body.get('keys', [])
        added = 0
        for k in keys:
            k = k.strip()
            if not k:
                continue
            cur.execute(
                "INSERT INTO happ_keys (key_value) VALUES (%s) ON CONFLICT (key_value) DO NOTHING",
                (k,)
            )
            added += cur.rowcount
        conn.commit()

        cur.execute("SELECT COUNT(*) FROM happ_keys WHERE is_used = FALSE")
        remaining = cur.fetchone()[0]
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'added': added, 'remaining': remaining})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}