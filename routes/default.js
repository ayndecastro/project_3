
module.exports = function (app) {
    app.get('/', (req, res) => {
        const safetravels = ["THESE ARE THE AVAILABLE API PATHS TO FETCH SAFETRAVELS DATA: ",
            {
                dataID: 1,
                desctription: "Budget your trip categories",
                path: "/categories"
            },
            {
                dataID: 2,
                desctription: "Get detailed cost of specific stuff example - taxi cost",
                path: "/costs/countryhighlights/:country_code"
            },
            {
                dataID: 3,
                desctription: "gives a suggested budget for specific category. reference /categories",
                path: "/costs/countryinfo/:country_code"
            },
            {
                dataID: 4,
                desctription: "search country info by name",
                path: "/search/country/:name"
            },
            {
                dataID: 5,
                desctription: "",
                path: ""
            },
            {
                dataID: 6,
                desctription: "",
                path: ""
            },
            {
                dataID: 7,
                desctription: "",
                path: ""
            },
            {
                dataID: 8,
                desctription: "",
                path: ""
            }
        ]

            res.json(safetravels)
    })


}
