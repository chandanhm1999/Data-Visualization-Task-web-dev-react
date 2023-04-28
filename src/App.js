import React, { Component } from 'react';
import { Navbar } from './components/navbar/Navbar';
import ECharts from 'echarts-for-react'; // first to install this yarn add echarts-for-react

// To Import the Wine Data Set from The wine.json file
import wineData from './wine.json';
import './App.css';
import { Footer } from './components/footer/Footer';

class App extends Component {
  render() {

    // To Create a list of alcohol categories and their corresponding minimum magnesium values
    const alcoholData = [];
    const alcoholCategories = wineData.map((wine) => wine.Alcohol);
    const uniqueAlcoholCategories = [...new Set(alcoholCategories)];
    uniqueAlcoholCategories.forEach((alcohol) => {
      const minMagnesium = Math.min(
        ...wineData
          .filter((wine) => wine.Alcohol === alcohol)
          .map((wine) => wine.Magnesium)
      );
      alcoholData.push({ alcohol, minMagnesium });
    });

    // for defineing the options for the line chart
    const lineChartOptions = {
      xAxis: {
        name: 'Flavanoids',
        type: 'value',
      },
      yAxis: {
        name: 'Ash',
        type: 'value',
      },
      series: [
        {
          type: 'line',
          data: wineData.map((wine) => [wine.Flavanoids, wine.Ash]),
        },
      ],
    };

    // for defineing the options for the bar chart
    const barChartOptions = {
      xAxis: {
        type: 'category',
        data: alcoholData.map((alcohol) => alcohol.alcohol),
        name: 'Alcohol',
      },
      yAxis: {
        type: 'value',
        name: 'Minimum Magnesium',
      },
      series: [
        {
          type: 'bar',
          data: alcoholData.map((alcohol) => alcohol.minMagnesium),
        },
      ],
    };

    return (
      // Html elemnts for defing the line & barcharts
      <div>
        <Navbar />
        <div className="chart-container">
        <div className="chart">
          <ECharts option={lineChartOptions} />
        </div>
        <div className="chart">
          <ECharts option={barChartOptions} />
        </div>
      </div>
      <Footer />
      </div>
    );
  }
}

export default App;
