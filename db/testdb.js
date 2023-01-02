const markerArray = [
  {
    coordinates: { lat: 40.57344620639121, lng: -73.97945438586295 },
    iconImage: "lib/icons/fight.png",
    content: `
    <div style="width: 200px">
    <h4>Coney Island</h4>
    <p>Home turf for 1979's The Warriors, famous for its amusement park on the beach</p>
    <img src="https://www.bkmag.com/wp-content/uploads/2017/02/the-warriors-coney-island-wonder-wheel.jpg" height=120px width=200px>
    <ul>Other famous films shot here:
    <li>Requiem for a Dream</li>
    <li>The Wiz</li>
    <li>Men in Black 3</li>
    <li>Brooklyn</li>
    </ul>
    </div>
    `,
  },
  {
    coordinates: { lat: 40.75912745350073, lng: -73.98517989368833 },
    iconImage: "https://img.icons8.com/offices/2x/jason-voorhees.png",
    content: `
    <div style="width: 200px">
    <h4>Times Square</h4>
    <p>Jason Takes Manhattan! The hockey masked killer stalked his victims in this tourist hotspot</p>
    <img src="https://media.gq.com/photos/5ace1aee240ad94792587238/3:2/w_1079,h_719,c_limit/friday-the-13th-jason-takes-manhattan.jpg" height=120px width=200px>
    <ul>Other famous films shot here:
    <li>Spider-Man</li>
    <li>Crocodile Dundee</li>
    <li>Captain America</li>
    <li>Vanilla Sky</li>
    </ul>
    </div>
    `
  },
  {
    coordinates: { lat: 40.71954, lng: -74.00654 },
    iconImage: "lib/icons/GB.png",
    content: `
    <div style="width: 200px">
    <h4>Hook and Ladder 8</h4>
    <p>The real-life firehouse used as headquarters for the Ghostbusters!</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Ghostbusters_Headquarters_-_Firehouse%2C_Hook_%26_Ladder_Company_8_%2852142207393%29.jpg" height=200px width=175px>
    </div>
    `
  },
  {
    coordinates: { lat: 40.83580797494333, lng: -73.92360035069603 },
    iconImage: "lib/icons/icons8-joker-48.png",
    content: `
    <div style="width: 200px">
    <h4>Joker Stairs</h4>
    <p>Famous staircase from the movie Joker!</p>
    <img src="https://assets.gqindia.com/photos/5db15dfe41ee9200093c672f/1:1/w_1080,h_1080,c_limit/Joker%20stairs%20tourist%20attraction.jpg" height=150px width=150px>
    </div>
    `
  },
  {
    coordinates: {lat: 40.78810654118659, lng: -73.97532517762367},
    iconImage: "lib/icons/micro.png",
    content: `
    <div style="width: 250px">
    <h4>The Arconia</h4>
    <p>Luxury condominiums made famous in the Apple TV series 'Only Murders in the Building'</p>
    <img src="https://hips.hearstapps.com/hmg-prod/images/oms1-101-cb-3765rt-1-1629918086.jpg" height=150px width=250px>
    </div>
    `
  },
  {
    coordinates: {lat: 40.80552736041293, lng: -73.96533334948504},
    iconImage: "lib/icons/comedy.png",
    content: `
    <div style="width: 250px">
    <h4>Tom's Diner</h4>
    <p>Iconic diner from the TV show Seinfeld'</p>
    <img src="https://www.sceen-it.com/Service/sceenit/sceen/thumb/12777.jpg/w/600/h/340/crop/true/nos/1400_01_Seinfeld_MonksRestaurant_01.png" height=150px width=250px>
    </div>
    `
  },
  {
    coordinates: {lat: 40.764708539132165, lng: -73.97419737462603},
    iconImage: "lib/icons/christmas.png",
    content: `
    <div style="width: 250px">
    <h4>The Plaza Hotel</h4>
    <p>Hotel where Kevin Mcallister famously stayed at in Home Alone 2 (with a Donald Trump cameo!)'</p>
    <img src="https://people.com/thmb/4s-nxSowEMt2aCaHP9UToQzXqCQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/trump-home-alone-2-2000-14d7564ae2244499ae65443c5fcaaa13.jpg" height=150px width=250px>
    <ul>Other famous films shot here:
    <li>Sleepless in Seattle</li>
    <li>The Great Gatsby</li>
    <li>North by Northwest</li>
    <li>Crocodile Dundee</li>
    </ul>
    </div>
    `,
    maxWidth: 250
  },
  {
    coordinates: {lat: 40.7813713439256, lng: -73.97396417194389},
    iconImage: "lib/icons/dino.png",
    content: `
    <div style="width: 250px">
    <h4>Museum of Natural History</h4>
    <p>Best known from the Night at the Museum series</p>
    <img src="https://c8.alamy.com/zooms/9/e78fc4b3e62f4576bf0b0a7c100d8374/2jh2pe7.jpg" height=250px width=250px>
    <ul>Other famous films shot here:
    <li>Manhattan</li>
    <li>Malcolm X</li>
    <li>Men in Black 2</li>
    <li>Election</li>
    </ul>
    </div>
    `,
    maxWidth: 250
  },
  {
    coordinates: {lat: 40.74647828981718, lng: -73.84509442425463},
    iconImage: "lib/icons/ufo.png",
    content: `
    <div style="width: 250px">
    <h4>Unisphere</h4>
    <p>Will Smith and Tommy-lee Jones shot down a UFO into this during the climax of Men in Black</p>
    <img src="https://images.squarespace-cdn.com/content/v1/5b9ffe0f1137a680c2c08250/1546554958337-1N34XUMWDBTSJRHS6H3S/MIB.jpg" height=220px width=250px>
    <ul>Other famous films shot here:
    <li>Iron Man 2</li>
    <li>Captain America</li>
    <li>Spiderman Homecoming</li>
    </ul>
    </div>
    `,
    maxWidth: 250
  },
  {
    coordinates: {lat: 40.72229802866851, lng: -73.98740754452456},
    iconImage: "lib/icons/deli.png",
    content: `
    <div style="width: 250px">
    <h4>Katz Delicatessen</h4>
    <p>Made famous by When Harry Met Sally.. <em>I'll have what she's having</em></p>
    <img src="https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/when-harry-met-sally---1989/EB19890712REVIEWS907120301AR.jpg" height=175px width=250px>
    <ul>Other famous films shot here:
    <li>Donnie Brasco</li>
    <li>Across the Universe</li>
    <li>Enchanted</li>
    </ul>
    </div>
    `,
    maxWidth: 250
  }
]

module.exports = {markerArray}