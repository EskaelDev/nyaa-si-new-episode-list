import { si, pantsu } from 'nyaapi';
import { Dictionary } from "./dictionary"
import { NyaaResponse } from "./nyaaResponse"

class AnimeChecker {
    currentAnimeList = new Dictionary<string[]>();
    lastEpisodeNumber = new Map<string, string>();

    constructor() {
        this.currentAnimeList.Add('HorribleSubs', [
            'Re Zero kara Hajimeru Isekai Seikatsu 1080',
            'Black Clover 1080',
            'The God of High School 1080',
            'Sword Art Online - Alicization - War of Underworld 1080',
            'Enen no Shouboutai S2 1080',
            'Yahari Ore no Seishun Love Come wa Machigatteiru Kan 1080',
            'Kanojo Okarishimasu 1080']);

    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    getEpisodeNumber(name: string): string {
        if (name.includes('[HorribleSubs]'))
            return name.substr(name.length - 15, 3).trim()
        return '';
    }

    async search(submiter: string, animeTitle: string): Promise<number> {

        let result = await si.searchByUser(submiter, animeTitle, 1);
        let epNumber = this.getEpisodeNumber(((result as []).shift() as NyaaResponse).name)
        this.lastEpisodeNumber.set(animeTitle, epNumber)
        return 0
    }
    // search(submiter: string, animeTitle: string): void {

    //     si.searchByUser(submiter, animeTitle, 1).then(result => {
    //         let epNumber = this.getEpisodeNumber(((result as []).shift() as NyaaResponse).name)
    //         this.lastEpisodeNumber.set(animeTitle, epNumber)
    //     },
    //         error => console.error(error));
    // }

    public async main(): Promise<void> {
        this.lastEpisodeNumber = new Map<string, string>();
        for (let submiter of this.currentAnimeList.Keys()) {
            for (let animeTitle of this.currentAnimeList.Item(submiter)) {
                await this.search(submiter, animeTitle);
            }
        }

        console.log(app.lastEpisodeNumber);


    }
}

let app = new AnimeChecker();
app.main();