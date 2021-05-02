import React, { Component } from 'react'
import SimpleReactFooter from "simple-react-footer";

export default class Footer extends Component {
    render() {
        const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
        const title = "E-Reader";
        const columns = [
    // {
    //     title: "Resources",
    //     resources: [
    //         {
    //             name: "About",
    //             link: "/about"
    //         },
    //         {
    //             name: "Careers",
    //             link: "/careers"
    //         },
    //         {
    //             name: "Contact",
    //             link: "/contact"
    //         },
    //         {
    //             name: "Admin",
    //             link: "/admin"
    //         }
    //     ]
    // },
    // {
    //     title: "Legal",
    //     resources: [
    //         {
    //             name: "Privacy",
    //             link: "/privacy"
    //         },
    //         {
    //             name: "Terms",
    //             link: "/terms"
    //         }
    //     ]
    // },
    // {
    //     title: "Visit",
    //     resources: [
    //         {
    //             name: "Locations",
    //             link: "/locations"
    //         },
    //         {
    //             name: "Culture",
    //             link: "/culture"
    //         }
    //     ]
    // }
 ];
        return (
            <div>
                <SimpleReactFooter 
                description={description} 
                title={title}
                columns={columns}
                iconColor="#333333"
                linkedin="fluffy_cat_on_linkedin"
                facebook="fluffy_cat_on_fb"
                twitter="fluffy_cat_on_twitter"
                instagram="fluffy_cat_live"
                youtube="UCFt6TSF464J8K82xeA?"
                pinterest="fluffy_cats_collections"
                copyright="Mariana Serban"
                iconColor="black"
                backgroundColor="#fff"
                fontColor="#333333"
                copyrightColor="darkgrey"
            />;
            </div>
        )
    }
}
