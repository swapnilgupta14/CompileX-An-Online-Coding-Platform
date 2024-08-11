const LocalstorageHelper = (key:string) => {

    const setKey = (data) =>{
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    const getKey = () =>{
        return JSON.parse(window.localStorage.getItem(key) ?? "{}");
    }

    return { getKey  , setKey };
};

export default LocalstorageHelper;
