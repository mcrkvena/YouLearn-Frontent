import axios from 'axios'

let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000
})

let Posts = {
    Comments: {
        async add(postId, comment) {
        await Service.post(`/forum/${postId}/comments/`, comment);
        },
        async delete(postId, commentId) {
            await Service.delete(`/forum/${postId}/comments/${commentId}`);
        },
        },
    add(post) {
        return Service.post('/forum', post);
    },
    async getOne(id) {
        let response = await Service.get(`/forum/${id}`);
        let doc = response.data;
        return {
        id: doc._id,
        url: doc.content,
        email: doc.postedBy,
        title: doc.title,
        posted_at: Number(doc.postedAt),
        comments: (doc.comments || []).map((c) => {
        c.id = c._id;
        delete c._id;
        return c;
        }),
        };
        },
    async getAll(searchTerm) {
        let options = {}

        if (searchTerm) {
            options.params = {
                _any: searchTerm
            }
        }

        return Service.get('/forum', options)
    }
}

let Videos = {
    Comments: {
        async add(videoId, comment) {
        await Service.post(`/videos/${videoId}/comments/`, comment);
        },
        async delete(videoId, commentId) {
            await Service.delete(`/videos/${videoId}/comments/${commentId}`);
        },
        },
    add(post) {
        return Service.post('/videos', post);
    },
    async getOne(videoid) {
        let response = await Service.get(`/videos/${videoid}`);
        let doc = response.data;
        return {
        videoid: doc._videoid,
        url: doc.url,
        email: doc.postedBy,
        title: doc.title,
        posted_at: Number(doc.postedAt),
        comments: (doc.comments || []).map((c) => {
        c.id = c._id;
        delete c._id;
        return c;
        }),
        };
        },
    async getAll(searchTerm) {
        let options = {}

        if (searchTerm) {
            options.params = {
                _any: searchTerm
            }
        }

        return Service.get('/videos', options)
    }
}

export { Service, Posts, Videos }