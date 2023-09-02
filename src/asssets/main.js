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
Descripcion landing page
`;

let playlists = [];
let artists = [];

const urlDatos = 'https://spotify23.p.rapidapi.com/user_profile/?id=monsterberg&playlistLimit=20&artistLimit=10';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '7f9957d316mshe8a676c0e954363p1bb84fjsn6c7ee451e234',
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
        uriUsuario.innerHTML = `Id de usuario: ${datos.uri}`
        nombreUsuario.innerHTML = `Nombre de Usuario: ${datos.name}`
        seguidoresUsuario.innerHTML = `Seguidores: ${datos.followers_count}`;
        siguiendoUsuario.innerHTML = `Siguiendo: ${datos.following_count}`
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
                <div class="tarjeta-artista">
                    <div class="artist__photo">
                        <img id="imgArtista" src="${artist.artistImg}" alt="">
                    </div>
                    <h1 id="nombreArtista">${artist.artistName}</h1>
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
                <div class="tarjeta-playlist">
                    <div class="playlist__photo">
                        <img id="imgPlaylist" src="${playlist.imgPlaylist}" alt="">
                    </div>
                    <h1 id="nombrePlaylist">${playlist.namePlaylist}</h1>
                    <h2 id="ownerPlaylist">${playlist.ownerPlaylist}</h2>
                </div>
            </a>
            `
        ).slice(0,20).join('')}`;
        contentPlaylists.innerHTML = viewPlaylists;
    })