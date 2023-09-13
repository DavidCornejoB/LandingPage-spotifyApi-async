# landing-spotify-async

Bienvenido/a a mi Landing Page de información de mi cuenta de Spotify. éste proyecto ha sido desarrollado con la finalidad de consumir la API de Spotify para
presentar información de usuario como: Id de Usuario, Nombre de Usuario, Número de Seguidores y usuarios a los que sigue, Artistas recientes, Playlists públicas, etc.

# UTILIZACIÓN DE LA API DE SPOTIFY:
["Enlace de la documentación de la API de Spotify en RapidApi"](https://rapidapi.com/es/Glavier/api/spotify23)

Se ha utilizado Fetch para poder consumir la Api. Para empezar, se crea una función (puede ser asíncrona) que reciba la url de la Api y retorne toda la información solicitada.

```js

function fetchData(url) {
    try {
        return fetch(url, options);
    } catch (error) {
        console.error(error);
    }
}
```

* Tanto el campo ```url``` como ```options``` se tratan de la url de la Api, así como la configuración para la petición a la Api (método GET, headers, etc.).

Luego, llamamos al método ```fetchData()``` en donde se transformará a json el conjunto de datos obtenidos desde la Api. Previamente se han creado 2 arreglos, tanto para artistas como para playlists,
y éstos serán llenados con los datos obtenidos. Fetch devuelve una promesa, así que tanto la transformación de la data, como el llenado de los arreglos hay que hacerlo dentro del ```.then()```

```js

fetchData(urlDatos)
    .then((result) => result.json())
    .then(datos => {

        // DATOS DE USUARIO
        uriUsuario.innerHTML = datos.uri;
        nombreUsuario.innerHTML = datos.name;
        seguidoresUsuario.innerHTML = datos.followers_count;
        siguiendoUsuario.innerHTML = datos.following_count;
        imgUsuario.src = datos.image_url;
        userImgUrl.href = datos.uri;


        // ARTISTAS RECIENTEMENTE ESCUCHAD0S:
        datos.recently_played_artists.map(artist => {
            let artistUrl = artist.uri;
            let artistName = artist.name;
            let artistImg = artist.image_url;

            artists.push({artistUrl, artistName, artistImg});
        });
 
        // PLAYLISTS PUBLICAS:
        datos.public_playlists.map(playlist => {
            let uriPlaylist = playlist.uri
            let idPlaylist = playlist.uri.toString().replace("spotify:playlist:", "");
            let namePlaylist = playlist.name;
            let ownerPlaylist = playlist.owner_name;
            let imgPlaylist = playlist.image_url.toString().replace("spotify:image:", "https://i.scdn.co/image/");

            playlists.push({uriPlaylist, idPlaylist, namePlaylist, ownerPlaylist, imgPlaylist});
        });

    }).finally( () => {

        // ARTISTAS RECIENTEMENTE ESCUCHADOS: 
        let viewArtists = `
        ${artists.map(artist => 
            `
            <a href="${artist.artistUrl}" class="contenedor-tarjetas">
                <div class="tarjeta">
                    <div class="tarjeta-photo">
                        <img class="img-tarjeta" id="imgArtista" src="${artist.artistImg}" alt="">
                    </div>
                    <h1 class="titulo-tarjeta" id="nombreArtista">${artist.artistName}</h1>
                </div>
            </a>
            `
        ).slice(0,20).join('')}`;
        contentArtists.innerHTML = viewArtists;

        // ARTISTAS RECIENTEMENTE ESCUCHADOS: 
        let viewPlaylists = `
        ${playlists.map(playlist => 
            `
            <a href="${playlist.uriPlaylist}" class="contenedor-tarjetas">
                <div class="tarjeta">
                    <div class="tarjeta-photo">
                        <img class="img-tarjeta-playlist" id="imgPlaylist" src="${playlist.imgPlaylist}" alt="">
                    </div>
                    <h2 class="titulo-tarjeta" id="nombrePlaylist">${playlist.namePlaylist}</h2>
                    <p class="contenido-tarjeta" id="ownerPlaylist">${playlist.ownerPlaylist}</p>
                </div>
            </a>
            `
        ).slice(0,20).join('')}`;
        contentPlaylists.innerHTML = viewPlaylists;
    })
```

# RESULTADOS:

["Enlace a la página generada"](https://davidcornejob.github.io/landing-spotify-async/)
