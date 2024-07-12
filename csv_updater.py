import csv

input_file = './assets/js/hexagon_grid.csv'  # original CSV file
output_file = './assets/js/updated_hexagon_grid.csv'  # updated CSV file

with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    for row in reader:
        updated_row = ['#FF00FF' if color != '#000000' else color for color in row]
        writer.writerow(updated_row)

print('CSV file has been updated and saved.')