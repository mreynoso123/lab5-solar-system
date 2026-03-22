import express from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
//root route
app.get('/', async(req, res) => {
    
    let randomImageResponse = await fetch('https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar%20system')
    let randomImageData = await randomImageResponse.json();
    //let randomImageURL = randomImageData.hits[0].previewURL;

    let index = Math.floor(Math.random() * randomImageData.hits.length)
    let randomImageURL = randomImageData.hits[index].previewURL
    //don't put things after render
    res.render('home.ejs', { image:randomImageURL });
});

/* app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${ planet }`]();
    console.log(planetInfo);
    res.render('planetInfo.ejs', { planetInfo, planet });
}); */

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;

    const planetMap = {
        Mercury: planets.getMercury,
        Venus: planets.getVenus,
        Earth: planets.getEarth,
        Mars: planets.getMars,
        Jupiter: planets.getJupiter,
        Saturn: planets.getSaturn,
        Uranus: planets.getUranus,
        Neptune: planets.getNeptune
    };

    let getPlanet = planetMap[planet];

    if (!getPlanet) {
        return res.status(400).send(`Invalid planet: ${planet}`);
    }

    let planetInfo = getPlanet();
    res.render('planetinfo.ejs', { planetInfo, planet });
});

app.get('/asteroidInfo', (req, res) => {
    let asteroid = req.query.asteroid;
    let asteroidInfo = planets.getAsteroids();
    console.log(asteroidInfo);
    res.render('asteroidInfo.ejs', { asteroidInfo, asteroid });
});

app.get('/cometInfo', (req, res) => {
    let comet = req.query.comet;
    let cometInfo = planets.getComets();
    console.log(cometInfo);
    res.render('cometInfo.ejs', { cometInfo, comet });
});

app.get('/meteorInfo', (req, res) => {
    let meteor = req.query.meteor;
    let meteorInfo = planets.getMeteorite();
    console.log(meteorInfo);
    res.render('meteorInfo.ejs', { meteorInfo, meteor });
});

app.get('/nasapod', async(req, res) => {
    let today = new Date().toISOString().split('T')[0];
    let nasaImageResponse = await fetch(`https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${today}`);
    let nasaImageData = await nasaImageResponse.json();
    let nasaImageURL = nasaImageData.url;
    console.log(nasaImageData)
    //don't put things after render
    res.render('nasapod.ejs', { image:nasaImageURL });
});

/* app.get('/mercury', (req, res) => {
    let mercuryInfo = planets.getMercury();
    console.log(mercuryInfo);
    res.render('mercury.ejs', {mercuryInfo});
}); */

app.listen(3000, () => {
    console.log('server started');
});
