import React from "react";

const HomePageSections = () => {
  // Static Columnists Data
  const columnists = [
    { name: "John Doe", bio: "Senior political analyst and journalist.", img: "https://i.ibb.co.com/gZBysHZX/jondoe.jpg" },
    { name: "Jane Smith", bio: "Award-winning financial columnist.", img: "https://i.ibb.co.com/TCtK8rc/jane-smith.jpg" },
    { name: "Emily Johnson", bio: "Tech industry expert and writer.", img: "https://i.ibb.co.com/3ynsQpqY/emily-johnson.jpg" },
  ];

  

  return (
    <div>
      {/* Featured Columnists Section */}
      <section style={{ padding: "20px", textAlign: "center" }}>
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">Featured Columnists</p>
      </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {columnists.map((columnist, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", textAlign: "center", width: "200px" }}>
              <img src={columnist.img} alt={columnist.name} style={{ borderRadius: "50%", width: "80px", height: "80px" }} />
              <h3>{columnist.name}</h3>
              <p>{columnist.bio}</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default HomePageSections;
