import pandas as pd
import ast

# extract csv file to dataframe
df = pd.read_csv('pokemon.csv')

# Combine 'type1' and 'type2' into a 'type' column
df['type'] = df[['type1', 'type2']].apply(lambda x: '/'.join(x.dropna().astype(str)), axis=1)

# Create the Pokemon dataFrame
pokemon_df = df[['name', 'height_m', 'weight_kg', 'type', 'pokedex_number']].copy()
pokemon_df.columns = ['name', 'height', 'weight', 'type', 'pokedex_number']

# Function to parse abilities
def parse_abilities(abilities_str):
    abilities_list = ast.literal_eval(abilities_str)
    primary_ability = abilities_list[0] if len(abilities_list) > 0 else None
    hidden_ability = abilities_list[1] if len(abilities_list) > 1 else None
    return pd.Series([primary_ability, hidden_ability])

# Apply the function to the 'abilities' column
abilities_df = df[['name', 'abilities']].copy()
abilities_df[['primary_ability', 'hidden_ability']] = abilities_df['abilities'].apply(parse_abilities)
abilities_df.drop('abilities', axis=1, inplace=True)

# Create the Stats dataframe
stats_df = df[['name', 'attack', 'sp_attack', 'speed', 'sp_defense', 'defense', 'hp']].copy()
stats_df.rename(columns={'hp': 'health'}, inplace=True)

# Export the dataframes to CSV files
pokemon_df.to_csv('pokemon_table.csv', index=False)
abilities_df.to_csv('abilities_table.csv', index=False)
stats_df.to_csv('stats_table.csv', index=False)

print("CSV files generated for Pokemon, Abilities, and Stats tables.")