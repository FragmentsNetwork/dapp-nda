
export default function promisify(inner) {
    return new Promise((resolve, reject) =>
        inner((error, response) =>
            error ? reject(error) : resolve(response)
        )
    );
}
