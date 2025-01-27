import React from "react";
import { Chart } from "react-google-charts";
import useArticles from "../Hooks/useArticles";

const PieChart = () => {
    const [articles] = useArticles();
    const amar_DeshArticles = articles.filter((item) => item.publishers === 'Amar Desh');
    const kaler_KanthoArticles = articles.filter((item) => item.publishers === 'Kaler Kantho');
    const prothom_AloArticles = articles.filter((item) => item.publishers === 'Prothom Alo');
    const Doinik_korotoaArticles = articles.filter((item) => item.publishers === 'Doinik Korotoa');
//     console.log(articles);
//   console.log(amar_DeshArticles);
//   console.log(kaler_KanthoArticles);
//   console.log(prothom_AloArticles);
  const amar = amar_DeshArticles.length
  const kaler = kaler_KanthoArticles.length
  const prothom = prothom_AloArticles.length
  const doinik = Doinik_korotoaArticles.length
  // নিবন্ধের ডেটা
  const publications = [
    { name: "Amar Desh", articles: amar },
    { name: "Kaler Kantho", articles: kaler },
    { name: "Prothom Alo", articles: prothom },
    { name: "Doinik korotoa", articles: doinik },
  ];

  // মোট নিবন্ধ সংখ্যা গণনা
  const totalArticles = publications.reduce(
    (total, pub) => total + pub.articles,
    0
  );

  // চার্টের জন্য ডেটা প্রস্তুত করা
  const chartData = [
    ["Publication", "Percentage"], // হেডার
    ...publications.map((pub) => [
      pub.name,
      (pub.articles / totalArticles) * 100, // শতাংশ হিসাব
    ]),
  ];

  // চার্ট অপশন
  const options = {
    title: "Percentage of Articles by Publication",
    pieHole: 0.4, // ডোনাট স্টাইলের জন্য
    is3D: false,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"500px"}
        height={"300px"}
      />
    </div>
  );
};

export default PieChart;