export async function getData(searchText) {
    const res = await fetch(
        `https://backend.cappsule.co.in/api/v1/new_search?q=${searchText}&pharmacyIds=1,2,3`,

    );
    let data = await res.json().then((item) => item.data.saltSuggestions);
    return data;
}