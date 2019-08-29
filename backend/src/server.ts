import {Api} from "./api";

const api = new Api(3000);

async function main() {
    await api.listen()
}

main().then(() => {
    console.log(`1'm up and running on port 3000`);
});