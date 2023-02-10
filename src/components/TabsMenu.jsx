import React, { useState, useRef } from "react"

const TabsMenu = (props) => {
    const tabs = props.tabs
    return (
        <div className="flex rounded-md shadow-sm" role="group">
            <button type="button" onClick={e => props.setSelectedTab(tabs[0].name)} className={(props.selectedTab === tabs[0].name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg"}>
                {tabs[0].name}
            </button>
            {
                tabs.slice(1, tabs.length-1).map((tab, index) => {
                    return (
                        <button key={index} type="button" onClick={e => props.setSelectedTab(tab.name)} className={(props.selectedTab === tab.name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border-t border-b border-gray-200"}>
                            {tab.name}
                        </button>
                    )
                })
            }
            <button type="button" onClick={e => props.setSelectedTab(tabs[2].name)} className={(props.selectedTab === tabs[2].name ? "bg-blue-800 text-white" : "bg-white text-black") + " flex-grow px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md"}>
                {tabs[tabs.length-1].name}
            </button>
        </div>
        )
    }


export default TabsMenu