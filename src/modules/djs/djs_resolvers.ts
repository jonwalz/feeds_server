import firebase from "../../../firebase";
import fetch from "node-fetch";

const fbUsers = firebase.database().ref("/users");

interface User {
    readonly val: () => string[];
}

interface FoundUsers {
    readonly [key: string]: any                   ;
}

const getDjs = async () => {
    let djs: ReadonlyArray<User> = [];
    await fbUsers.once("value", (user: User) => {
        const found: FoundUsers = user.val();
        djs = Object.keys(found).reduce((acc: ReadonlyArray<User>, key: string, i) => {
            return [
                ...acc,
                found[key],
            ];
        }, []);
    });

    return djs;
};

interface RemoteArgs {
    readonly id: string;
}

interface RemoteDj {
    readonly id: string;
}

interface RemoteDjs {
    readonly [key: string]: any;
}

const getDj = async (_: any, args: RemoteArgs) => {
    const djs: RemoteDjs = await getDjs();
    const result = djs.reduce((acc: ReadonlyArray<RemoteDj>, dj: RemoteDj) => {
        return dj.id === args.id
            ? dj
            : acc;
    }, {});

    return result;
};

const postDj = async (_: any, args: RemoteArgs) => {
    const { name, username, metadata: { connections: { feed }}}: any = await getDjInfo(args.id);

    await firebase.database().ref(`/users/${args.id}`).set({
        username,
        display_name: name,
        feed_url: feed,
    });

    return {
        username,
        feed_url: feed,
        display_name: name,
    };
};

const getDjInfo = async (id: string) => {
    let info = {};
    await fetch(`https://api.mixcloud.com/${id}/?metadata=1`)
        .then((resp: any) => resp.json())
        .then((json: any) => info = json);

    return info;
};

export default {
    getDjs,
    getDj,
    postDj,
};
