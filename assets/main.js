const textoDescripcion = document.getElementById('textoDescripcion');
const uriUsuario = document.getElementById('uriUsuario');
const nombreUsuario = document.getElementById('nombreUsuario');
const seguidoresUsuario = document.getElementById('seguidoresUsuario');
const siguiendoUsuario = document.getElementById('siguiendoUsuario');
const imgUsuario = document.getElementById('imgUsuario');
const userImgUrl = document.getElementById('userImgUrl');
const contentArtists = null || document.getElementById('contentArtists');
const contentPlaylists = null || document.getElementById('contentPlaylists');

textoDescripcion.innerHTML = 
`
Bienvenido/a a mi Landing Page de información de mi cuenta de Spotify. éste proyecto ha sido desarrollado con la finalidad de consumir la API de Spotify para
presentar información de usuario como: Id de Usuario, Nombre de Usuario, Número de Seguidores y usuarios a los que sigue, Artistas recientes, Playlists públicas, etc.
`;

let playlists = [];
let artists = [];

const urlDatos = 'https://spotify23.p.rapidapi.com/user_profile/?id=monsterberg&playlistLimit=21&artistLimit=8';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b34f09974emshd0ac76bd2f80487p1d8c7bjsnb20d8353cf36',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
}
};

function fetchData(url) {
    try {
        return fetch(url, options);
    } catch (error) {
        console.error(error);
    }
}

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