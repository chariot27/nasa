import requests
import sqlite3

url = 'https://data.nasa.gov/resource/b67r-rgxc.json'
response = requests.get(url)
data = response.json()
comets = [item for item in data]

conn = sqlite3.connect("\\Users\\maxta\\Documents\\GitHub\\nasa\\db.sqlite3")
cursor = conn.cursor()

# Create the table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS api_rest_comet (
        comet_name TEXT
    )
''')

for comet in comets:
    cursor.execute('''
        INSERT INTO api_rest_comet (comet_name)
        VALUES (?)
    ''', (comet,))

    conn.commit()
conn.close()