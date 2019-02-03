import firebase from '../../../firebase';
import fetch from 'node-fetch';

const users = firebase.database().ref('/users')

const getDjs = async () => {
    let djs = [];
    await users.once("value", (users) => {
        const found = users.val()
        djs = Object.keys(found).reduce((acc, key) => {
            return [
                ...acc,
                found[key]
            ]
        }, [])
    })

    return djs
}

const getDj = async (_, args) => {
    const djs = await getDjs()
    const result = djs.reduce((acc, dj) => {
        return dj.id === args.id
            ? dj
            : acc
    }, {})

    return result
}

const postDj = async (_, args) => {
    const info = await getDjInfo(args.id)
    const { name, username, metadata: { connections: { feed }}} = info

    await firebase.database().ref(`/users/${args.id}`).set({
        username: username,
        display_name: name,
        feed_url: feed
    })

    return {
        username,
        feed_url: feed,
        display_name: name,
    }
}

const getDjInfo = async (id) =>{
    let info = {}
    await fetch(`https://api.mixcloud.com/${id}/?metadata=1`)
        .then(resp => resp.json())
        .then(json => info = json)

    return info
}

export default {
    getDjs,
    getDj,
    postDj,
};
