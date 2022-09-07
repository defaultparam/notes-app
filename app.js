const notes = require('./notes.js');
const yargs = require('yargs');
const { option } = require('yargs');
const { removeNote } = require('./notes.js');


// - Add arguments to take in the note
yargs.command({
    command: 'add',
    describe: 'Adding a note!',
    builder: {
        title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
        },
        body: {
            describe: "Note's body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
})
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
})
yargs.command({
    command: 'list',
    description: 'List your notes',
    handler: () => notes.listNotes()
})
yargs.command({
    command: 'read',
    description: 'Read a particular note',
    builder: {
        title: {
            describe: 'Title of the note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
})
yargs.parse()