const {Command} = require('discord.js-commando');
const { oneLine } = require('common-tags');

module.exports = class StoryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'story',
            aliases:['storytime','stew'],
            group: 'basic',
            memberName: 'story',
            description: 'Tells an epic yarn.',
            examples: ['tell me a story']
        });
    }
    run(msg) {
        console.log("tellin a story");
        //const navySeal = oneLine `:regional_indicator_w: :regional_indicator_h: :regional_indicator_a: :regional_indicator_t: :regional_indicator_t: :regional_indicator_h: :regional_indicator_e: :regional_indicator_f: :regional_indicator_u: :regional_indicator_c: :regional_indicator_k: :regional_indicator_d: :regional_indicator_i: :regional_indicator_d: :regional_indicator_y: :regional_indicator_o: :regional_indicator_u: :regional_indicator_j: :regional_indicator_u: :regional_indicator_s: :regional_indicator_t: :regional_indicator_f: :regional_indicator_u: :regional_indicator_c: :regional_indicator_k: :regional_indicator_i: :regional_indicator_n: :regional_indicator_g: :regional_indicator_s: :regional_indicator_a: :regional_indicator_y: :regional_indicator_a: :regional_indicator_b: :regional_indicator_o: :regional_indicator_u: :regional_indicator_t: :regional_indicator_m: :regional_indicator_e: , :regional_indicator_y: :regional_indicator_o: :regional_indicator_u: :regional_indicator_l: :regional_indicator_i: :regional_indicator_t: :regional_indicator_t: :regional_indicator_l: :regional_indicator_e: :regional_indicator_b: :regional_indicator_i: :regional_indicator_t: :regional_indicator_c: :regional_indicator_h: ? `
        const gotStory =  oneLine`Look, having dragons — my uncle was a great Maester and scholar, Grandmaester Steffon Baratheon at the Citadel; strong seed, very strong seed, OK, very smart, full chains of iron and gold, very good, very smart — you know, if you’re a full-blooded Baratheon, if I were a Targaryen, if, like, OK, if I took the throne as a legitimate Targaryen, they would say I’m one of the smartest people anywhere in the world — it’s true! — but when you’re a Baratheon they try — oh, do they do a number — that’s why I always start off: Went to The Aerie, was a good student, went there, went there, did this, Gods I was strong then — you know I have to give my like credentials all the time, because we’re a little disadvantaged — but you look at the dragons and the Dothraki screamers, the thing that really bothers me — it would have been so easy, and it’s not as important as these lives are — Dragons are powerful; my uncle explained that to me many, many years ago, the power and that was 35 years ago; he would explain the power of what’s going to happen and he was right, who would have thought? — but when you look at what’s going on with the whore's two dragons — now it used to be three, now it’s two — but when it was three and even now, I would have said it’s all in the messenger; fellas, and it is fellas because, you know, they don’t, they haven’t figured that the women are smarter right now than the men, so, you know, it’s gonna take them about another 150 years — but the Lannisters are great negotiators, the Lannisters are great negotiators, so, and they, they just killed, they just killed us. On an open field, Ned.`
        const trumpStory=  oneLine`Look, having nuclear—my uncle was a great professor and scientist and engineer, Dr. John Trump at MIT; good genes, very good genes, OK, very smart, the Wharton School of Finance, very good, very smart—you know, if you’re a conservative Republican, if I were a liberal, if, like, OK, if I ran as a liberal Democrat, they would say I'm one of the smartest people anywhere in the world—it’s true!—but when you're a conservative Republican they try—oh, do they do a number—that’s why I always start off: Went to Wharton, was a good student, went there, went there, did this, built a fortune—you know I have to give my like credentials all the time, because we’re a little disadvantaged—but you look at the nuclear deal, the thing that really bothers me—it would have been so easy, and it’s not as important as these lives are (nuclear is powerful; my uncle explained that to me many, many years ago, the power and that was 35 years ago; he would explain the power of what's going to happen and he was right—who would have thought?), but when you look at what's going on with the four prisoners—now it used to be three, now it’s four—but when it was three and even now, I would have said it's all in the messenger; fellas, and it is fellas because, you know, they don't, they haven’t figured that the women are smarter right now than the men, so, you know, it’s gonna take them about another 150 years—but the Persians are great negotiators, the Iranians are great negotiators, so, and they, they just killed, they just killed us.`
        const hitOrMiss = oneLine`hit 👋👊 or miss 👋😳 i guess 🤔🧠 they never 🚫miss👋😔huh! 🤠U got a boyfriend 👩‍❤️‍👩👭 i bet he never ❌🚫 kiss 😘💋👄 ya 😂 *mwah!* 😍✨👄😘 he gon find 👀👓🔍 another girl 👩‍❤️‍💋‍👩👭💔& he wont miss ya 😠😘😂 he gon sKRRR🚘🚨💥 & hit the dab 👉🏽🤠👉🏽 like wiz khalifa 🤩🍁`
        const trumpStory2 = oneLine`Today at Walmart I told the cashier Merry Christmas. She said, "Happy Holidays, ma'am, I smiled and said "You don't have to be afraid anymore. President Trump gave us Christmas back" she started crying tears of joy and said "Merry Christmas" and then everyone in the store applauded👏👏👏🤗`    
        let storyList = [
            hitOrMiss,
            gotStory,
            trumpStory,
           // navySeal,
            trumpStory2
        ]
            let story;
     story = storyList[Math.floor(Math.random() * storyList.length)];
    msg.channel.send(story)
    }
};