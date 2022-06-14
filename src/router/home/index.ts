import {getUserRankLevel} from "@/api/api";

const homeStore = {
    state:{
        rankLevel:null
    },
    mutations:{
        setUserRankLevel(state,rankLevel){
            state.rankLevel = rankLevel;
        }
    },
    actions:{
        async getUserRankLevel(context){
            await getUserRankLevel().then(result => {
                if(result){
                    context.commit('setUserRankLevel',result.data);
                }
            })
        }
    }
}

export default homeStore