

export function listagem(fotos){
    return {type:'LISTAGEM',fotos};
}

export function like(fotoId, liker){
    return {type: 'LIKE', fotoId, liker};
}
