import pandas as pd

chunksize = 50000
for i, chunk in enumerate(pd.read_csv('emails.csv', chunksize=chunksize)):
    chunk_name = f'emails_chunk_{i}.csv'
    chunk.to_csv(chunk_name, index=False)
    print("created chunk", chunk_name)
