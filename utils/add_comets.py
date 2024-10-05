import requests

def get_commets():
    url = 'https://data.nasa.gov/resource/b67r-rgxc.json'
    response = requests.get(url)
    data = response.json()

    # Definindo os campos de interesse
    fields = [
        'object_name',  # nome
        'p_yr',         # orbita solar - quantidade de tempo de orbita solar
        'moid_au',      # distancia da terra
        'w_deg',        # distancia do sol
        'ref'
    ]

    commets = []

    for line in data:
        commet = {}
        for field in fields:
            if field in line:
                commet[field] = line[field]
        commets.append(commet)

    print(commets)

if __name__ == '__main__':
    get_commets()
        
