const { db } = require('./db');
const { Band, Musician, Song } = require('./index');
const { describe, it, expect } = require("@jest/globals");

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });

        await Band.bulkCreate([
            { name: "NERD", genre: "rap" },
            { name: "2 Wayne", genre: "rap" },
            { name: "Qveen Herby", genre: "rap" }
        ]);
        await Musician.bulkCreate([
            { name: "2 Chainz", intrument: "voice" },
            { name: "Lil Wayne", instrument: "voice" },
            { name: "Pharrell", instrument: "computer" },
            { name: "Qveen", instrument: "voice" },
            { name: "Qveen Hubby", instrument: "computer" }
        ]);
        await Song.bulkCreate([
            { title: "Housewife", year: 2023, length: 3 },
            { title: "Long Story Short", year: 2023, length: 3 },
            { title: "LEMON", year: 2011, length: 4 }
        ]);
    
    
    })

    

    it("Bands have Musicians", async () => {
        const nerd = await Band.findOne({ where: { name: "Qveen Herby" }});
        const musician = await Musician.findAll({ where: { name: ["Qveen", "Qveen Hubby" ]}});
        await nerd.addMusicians(musician);
        
        const bandWithMusician = await Band.findOne({ where: { name: "Qveen Herby" }, include: Musician });
        const bandMusician = await bandWithMusician.getMusicians();
        console.log(JSON.stringify(bandWithMusician, null, 2));
        const check = await Musician.findAll({ where: { name: ["Qveen", "Qveen Hubby" ]}});
        expect(bandMusician).toEqual(check);
    })
    /*
    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({ name: "The Doors", genre: "Music" });
        expect(testBand.name).toBe("The Doors");
        expect(testBand.genre).toBe("Music");
    })



    test('can create a Musician', async () => {
        // TODO - test creating a musician
        await Musician.create({ name: "Jimmy Hendrix", instrument: "Guitar" });
        const testMusician = await Musician.findAll();
        expect(testMusician[0].name).toBe('Jimmy Hendrix');
        expect(testMusician[0].instrument).toBe("Guitar");
    })

    it("can create a song", async () => {
        await Song.create({ title: "16 Carriages", year: 2024, length: 3 });
        const testSong = await Song.findAll();
        expect(testSong[0].title).toBe("16 Carriages");
        expect(testSong[0].year).toBe(2024);
        expect(testSong[0].length).toBe(3);
    })

    test('can update a Band', async () => {
        // TODO - test updating a band
        await db.sync({ force: true });
        let testBand = await Band.create({ name: "The Doors", genre: "Music" });
        await Band.update({ name: "Slipknot", genre: "Metal" }, { where: { name : "The Doors" }});
        testBand = await Band.findByPk(1);
        expect(testBand.name).toBe('Slipknot');
        expect(testBand.genre).toBe("Metal");
    })

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        await Musician.create({ name: "T-Pain", instrument: "Autotune" });
        await Musician.create({ name: "Jacob Collier", instrument: "All instruments" });
        await Musician.create({ name: "Anderson .Paak", instrument: "Drums" });
        await Musician.update({ name: "Blu DeTiger", instrument: "Bass" }, { where: { name: "T-Pain" }});
        const testMusician = await Musician.findAll({where: { name: "Blu DeTiger" }});
        expect(testMusician[0].name).toBe("Blu DeTiger");
        expect(testMusician[0].instrument).toBe("Bass");
    })

    it("Can update a Song", async () => {
        await Song.create({ title: "16 Carriages", year: 2024, length: 3 });
        await Song.update({ title: "Love on Top", year: 2015, length: 3 }, { where: { title: "16 Carriages" }});
        const testSong = await Song.findAll();
        expect(testSong[0].title).toBe("Love on Top");
        expect(testSong[0].year).toBe(2015);
        expect(testSong[0].length).toBe(3);
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        await db.sync({ force: true });
        await Band.create({ name: "The Doors", genre: "Music" });
        await Band.create({ name: "ACDC", genre: "Dad Rock" });
        await Band.create({ name: "Anderson .Paak", genre: "Good Stuff" });
        await Band.destroy({ where: { name: "Jacob Collier" }});
        const testDeletion = await Band.findOne({where: { name: "ACDC" }});
        expect(testDeletion).toBeNull;
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        await Musician.create({ name: "T-Pain", instrument: "Autotune" });
        await Musician.create({ name: "Jacob Collier", instrument: "All instruments" });
        await Musician.create({ name: "Anderson .Paak", instrument: "Drums" });
        await Musician.destroy({ where: { name: "Jacob Collier" }});
        const testDeletion = await Musician.findOne({where: { name: "Jacob Collier" }});
        expect(testDeletion).toBeNull;
    })

    it("Can delete a Song", async () => {
        await Song.create({ title: "Love on Top", year: 2016, length: 4 });
        await Song.create({ title: "16 Carriages", year: 2024, length: 5 });
        await Song.create({ title: "Deeper Well", year: 2024, length: 6 });
        await Song.destroy({ where: { title: "Love on Top" }});
        const testDeletion = await Song.findOne({where: { title: "Love on Top" }});
        expect(testDeletion).toBeNull;
    }) */
})