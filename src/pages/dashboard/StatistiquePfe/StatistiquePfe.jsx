import React, { useEffect, useState } from "react";
import ChartBar from "../../../components/charts/ChartBar";
import ChartPie from "../../../components/charts/ChartPie";
import Stats from "../../../services/StatsPfe";
import { Grid } from "@mui/material";
import H1 from "../../../components/Texts/H1";

function StatsByPromotion() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatPromo()
      .then((data) => {
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartBar
        libelle="Stats PFE By Promotion"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsBySociete() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatSociete()
      .then((data) => {
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartBar
        libelle="Stats PFE By Societe"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsByTech() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatTechno()
      .then((data) => {
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartBar
        libelle="Stats PFE By Technologies"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsByMention() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatMention()
      .then((data) => {
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartBar
        libelle="Stats PFE By Mention"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsByPays() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatPays()
      .then((data) => {
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartBar
        libelle="Stats PFE By Pays"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsByEnseig() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatEncad()
      .then((data) => {
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartBar
        libelle="Stats PFE By Mention"
        labels={stats.map((stat) => stat.name)}
        values={stats.map((stat) => stat.nb)}
      />
    </div>
  );
}

function StatsByState() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatPie()
      .then((data) => {
        console.log(data.data.data);
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartPie
        libelle="Stats PFE By Mention"
        labels={stats.map((stat) => stat.text)}
        values={stats.map((stat) => stat.value)}
      />
    </div>
  );
}

function StatsSocietePie() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatSociete()
      .then((data) => {
        console.log(data.data.data);
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartPie
        libelle="Stats PFE By Societe"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatsTechnoPie() {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    Stats.StatTechno()
      .then((data) => {
        console.log(data.data.data);
        setstats(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ChartPie
        libelle="Stats PFE By Technologies"
        labels={stats.map((stat) => stat._id)}
        values={stats.map((stat) => stat.count)}
      />
    </div>
  );
}

function StatistiquePfe() {
  return (
    <div>
      <H1>Statistiques sur les PFEs</H1>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6}>
          <StatsByPromotion />
        </Grid>
        <Grid item lg={6} md={6} sm={6}>
          <StatsBySociete />
        </Grid>
        <Grid item lg={6} md={6} sm={6}>
          <StatsByTech />
        </Grid>
        <Grid item lg={6} md={6} sm={6}>
          <StatsByMention />
        </Grid>
        <Grid item lg={6} md={6} sm={6}>
          <StatsByEnseig />
        </Grid>
        <Grid item lg={6} md={6} sm={6}>
          <StatsByPays />
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <StatsByState />
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <StatsSocietePie />
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <StatsTechnoPie />
        </Grid>
      </Grid>
    </div>
  );
}

export default StatistiquePfe;
