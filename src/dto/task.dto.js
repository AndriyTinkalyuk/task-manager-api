export const createTaskDto = (data) => {
    return {
        author: data.author.trim(),
        title: data.title.trim(),
        description: data.description.trim(),
        status: data.status.trim(),
        picture: data.picture || null,
    }
}


export const updateTaskDto = (data) => {
const updatedData = {}

if (data.author) {
    updatedData.author = data.author.trim();
}
if (data.title) {
    updatedData.title = data.title.trim();
}
if (data.description) {
    updatedData.description = data.description.trim();
}
if (data.status) {
    updatedData.status = data.status.trim();
}
if (data.picture) {
    updatedData.picture = data.picture || null;
}
return updatedData;
}

export const responseTaskDto = (data) => {
    return {
        id: data._id,
        author: data.author,
        title: data.title,
        description: data.description,
        status: data.status,
        picture: data.picture || null,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
}