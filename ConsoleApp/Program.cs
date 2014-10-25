using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using Newtonsoft.Json;

namespace ConsoleApp
{
    class Program
    {
        static void Main( string[] args )
        {
            Console.WriteLine( "Reading files..." );
            var pathToFilesFolder = "../../../Files/";
            var stateCsv = new CsvReader( new StreamReader( pathToFilesFolder + "States.csv" ) );
            var stateData = stateCsv.GetRecords<StateData>().ToList();

            var zipCsv = new CsvReader( new StreamReader( pathToFilesFolder + "ZIP_CODES.csv" ) );
            var zipData = zipCsv.GetRecords<ZipCodeData>().ToList();

            Console.WriteLine( "{0} ZipCode Entries", zipData.Count );
            Console.WriteLine( "{0} State Entries", stateData.Count );

            Console.WriteLine( "Creating hashes..." );

            var zipHash = zipData.ToDictionary( z => z.zip_code, z => new
            {
                latitude = z.latitude,
                longitude = z.longitude,
                city = z.city,
                stateId = z.state_id,
                county = z.county,
                zipClass = z.zip_class
            } );

            var stateHash = stateData.ToDictionary( s => s.state_id, s => new
            {
                name = s.name,
                capital = s.capital,
                mostPopulousCity = s.most_populous_city,
                population = Double.Parse( s.population.Replace(",", "") ),
                squareMiles = Double.Parse( s.square_miles.Replace( ",", "" ) ),
                timeZone1 = s.time_zone_1,
                timeZone2 = s.time_zone_2,
                dst = s.dst
            } );


            var zipJson = JsonConvert.SerializeObject( zipHash, Formatting.Indented );
            var stateJson = JsonConvert.SerializeObject( stateHash, Formatting.Indented );
            Console.WriteLine( "Writing files..." );
            File.WriteAllText( pathToFilesFolder + "States.json", stateJson );
            File.WriteAllText( pathToFilesFolder + "ZipCodes.json", zipJson );
            Console.WriteLine( "Finished!" );
            Console.Read();

        }
    }

    internal class ZipCodeData
    {
        public string zip_code { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string city { get; set; }
        public string state_id { get; set; }
        public string county { get; set; }
        public string zip_class { get; set; }
    }

    internal class StateData
    {
        public string name { get; set; }
        public string state_id { get; set; }
        public string capital { get; set; }
        public string most_populous_city { get; set; }
        public string population { get; set; }
        public string square_miles { get; set; }
        public string time_zone_1 { get; set; }
        public string time_zone_2 { get; set; }
        public string dst { get; set; }

    }
}
