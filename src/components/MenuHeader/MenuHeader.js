import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MenuHeader.module.css';
import { getAllCategory } from './../../store/actions/index';

const MenuHeader = () => {
    const category = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const renderCategories = (categoryList) => {
        let categories = [];
        for (let category of categoryList) {
            categories.push(
                <li key={category._id}>
                    {
                        category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> :
                            <span>{category.name}</span>
                    }
                    {category.children.length > 0 ?
                        <ul>
                            {renderCategories(category.children)}
                        </ul>
                        : ''}
                </li>
            )
        }
        return categories
    }
    return (

        <div className={styles.menuHeader}>
            <ul>
                {category.categories.length > 0 && renderCategories(category.categories)}
            </ul>
        </div>
    )
}

export default MenuHeader
