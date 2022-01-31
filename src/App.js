import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [companies, setCompanies] = useState([]);
    //const [companies, setCompanies] = useState([]);

    useEffect(async () => {
        await getCompanies()
            .then(displayCompanies);
    }, []);

    const getCompanies = async _ => {
        await fetch("https://gist.githubusercontent.com/VincentLeV/a0c326b9cbeabf63b4e5e02aa9779f6c/raw/b916a9e3d40aef926bf7e3b9b4db308d7da1ca5d/shares.json")
            .then(response => response.json())
            .then(responseJson => setCompanies(responseJson))
            .then(_ => console.log(companies))
    }

    const displayCompanies = _=>{
        for (let i = 0; i < companies.length; i++) {
            let divHistory = companies[i].dividendHistory;
            let price = companies[i].price;

            // CALCULATING LAST YIELD %
            let yiield;
            yiield = (divHistory[0].dividend / price) * 100;


            // CALCULATING AVERAGE YIELD %
            let sumYields = 0;
            let avYield;
            for (let x = 0; x < divHistory.length; x++) {
                sumYields += divHistory[x].dividend;
            }
            avYield = (sumYields / (price * divHistory.length)) * 100;


            // CALCULATING AVERAGE WEIGHTED YIELD %
            let avWeightYield;
            let sumWeightYields = 0;
            for (let y = 0; y < 5; y++) {
                if (y === 0) sumWeightYields += divHistory[y].dividend * 3;
                else if (y === 1) sumWeightYields += divHistory[y].dividend * 2;
                else sumWeightYields += divHistory[y].dividend;
            }
            avWeightYield = ((sumWeightYields) / (price * 8)) * 100;


            // DISPLAYING EACH COMPANY DATA
            console.log(
                "Share: " + companies[i].share +
                "\nCompany: " + companies[i].company +
                "\nPrice: " + price +
                "\nLast year dividend: " + divHistory[0].dividend +
                "\nDividend yield-%: " + yiield.toFixed(1) +
                "\n5-year average dividend yield-%: " + avYield.toFixed(1) +
                "\n5-year weighted average dividend yield-%: " + avWeightYield.toFixed(1) + "\n"
            );

            /*console.log("Share: " + companies[i].share);
            console.log("Company: " + companies[i].company);
            console.log("Price: " + price);
            console.log("Last year dividend: " + divHistory[0].dividend);
            console.log("Dividend yield-%: " + yiield.toFixed(1));
            console.log("5-year average dividend yield-%: " + avYield.toFixed(1));
            console.log("5-year weighted average dividend yield-%: " + avWeightYield.toFixed(1));*/
        }
    }

  return (
    <div className="App">
      <header className="App-header">
          <button onClick={displayCompanies}>Show Companies</button>
      </header>
    </div>
  );
}

export default App;
