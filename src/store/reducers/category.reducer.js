import { categoryConstants } from './../actions/constants';

const initState = {
    categories: [],
    loading: false,
    error: null
}

// const buildNewCategories = (categories, parentId, category) => {
//     let categoryList = []
//     if (parentId === undefined) {
//         return [
//             ...categories, {
//                 _id: category._id,
//                 name: category.name,
//                 slug: category.slug,
//                 children: []
//             }
//         ]
//     }
//     for (let cat of categories) {
//         if (cat._id === parentId) {
//             const newCategory = {
//                 _id: category._id,
//                 parentId: category.parentId,
//                 name: category.name,
//                 slug: category.slug,
//                 children: []
//             }
//             categoryList.push({
//                 ...cat,
//                 children: cat.children ? buildNewCategories([...cat.children, newCategory], parentId, category) : []
//             })
//         } else {
//             categoryList.push({
//                 ...cat,
//                 children: cat.children ? buildNewCategories(cat.children, parentId, category) : []
//             })
//         }
//     }
//     return categoryList;
// }

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: false,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
            return state;
    }
    return state;
}

export default categoryReducer