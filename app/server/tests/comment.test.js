const {
    connectDb,
    closeDb,
    clearDb
} = require('./db');
const {
    createComment,
    getAllParentComments,
    getAllCommentReplies,
    delComment,
    editComment,
    addLike,
    removeLike,
} = require('..services/comment');

describe('comment service', () => {
    //initialize db before test runs
    beforeAll(async () => {
        await connectDb();
    });

    //cleanup
    afterEach(async () => {
        await clearDb();
    });

    //teardown
    afterAll(async () => {
        await closeDb();
    });
    describe('createComment', () => {
        it('saves valid parent comment', () => {
            const parent = createComment({
                type: 'parent',
                author: ['John Doe', '6221e434w5533w6'],
                text: '<p>Hello world</p>',
                projectId: '63117773g63g6e444a4',      
            });
            expect(parent[0]).toBe(true);
            expect(parent[1].parentId).toBe(null);
        });
        //it('saves valid child comment', () => {
           // const child = createComment();
           // expect().toEqual();
       // });
    })
    
})