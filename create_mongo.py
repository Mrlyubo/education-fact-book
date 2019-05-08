
import csv
def create_mongo(file):

    with open(file, newline='') as csvfile:
        data = list(csv.reader(csvfile))
        for i in data:
            i[0] = '{"_id"'+':'+i[0]+','
            i[1] = '"loc"'+':'+ "{"+'"lat"'+':'+i[1]+','
            i[2] = '"lng"'+':'+i[2]+"}"+','
            i[3] = '"State_Name"'+':'+'"'+i[3]+'"'+','
            i[4] = '"Average_Income"'+':'+i[4]+','
            i[5] = '"Education_Level"'+':'+"{"+'"Without_Bachelor_Degree"'+':'+i[5]+','
            i[6] = '"Bachelor_Degree"'+':'+i[6]+','
            i[7] = '"Master_Degree"'+':'+i[7]+','
            i[8] = '"Phd_Degree"'+':'+i[8]+"}}"
            i[1:3] = [''.join(i[1:3])]
            i[5:] = [''.join(i[5:])]
            i[0:] = [''.join(i[0:])]
    df = []    
    for i in data:
        df = df + i
    df = ',\n'.join(df[0:])
    print(df)       

    with open('cismongo.json', 'w') as file_handler:
        for item in data:
            file_handler.write("{},\n".format(item))
        
create_mongo("statelatlong.csv")






