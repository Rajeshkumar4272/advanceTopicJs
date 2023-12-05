


        (function () {
            const gamingApi = {
                gameCard: document.getElementById('gameCard'),

                displayApi: async function () {
                    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc'
                    const options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key' : '',
                            'X-RapidAPI-Host': ''
                        }
                    };
                    
                    try {
                        const response = await fetch(url, options);
                        const result = await response.json();
                        result.map((item) => {
                            console.log(item);
                            this.gameCard.innerHTML += `
                            <img src="${item.thumbnail}" alt="Trove" class="w-full h-48 object-cover">
         <div class="p-4">
          <h3 class="font-medium text-xl mb-2" >${item.title}</h3> 
          <div class="text-gray-500 text-sm mb-4 flex gap-4">
            <div><b>Genre:</b> ${item.genre}</div>
            <div><b>Platform:</b> ${item.platform}</div>
            <div>
              <b>Released:</b> ${item.release_date}
            </div>
          </div>
          <p class="text-gray-600">
            ${item.short_description}
          </p>
          <a href="${item.game_url}" target="_blank" class="inline-block bg-indigo-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-indigo-600">
            Play Now
          </a>
        </div>` })
                    } catch (error) {
                        console.error(error);
                    }
                },


                bind: async function () {
                    this.displayApi()
                }

            }
            gamingApi.bind()
        })()
        
    