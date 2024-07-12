import pandas as pd
import json

# Load the CSV file
file_path = './assets/js/hexagon_grid.csv'
hex_data = pd.read_csv(file_path, header=None)

# Convert the DataFrame to a list of lists (array of arrays)
hex_array = hex_data.values.tolist()

# Convert Python list of lists to JSON string
hex_array_json = json.dumps(hex_array)

with open('./assets/js/hex_data.json', 'w') as json_file:
    json_file.write(hex_array_json)