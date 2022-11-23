<template>
    <h1>카카오 로그인 성공</h1>
</template>

<script>
import axios from "@/api/http.js";
import { mapState, mapActions } from "vuex";
const userStore = "userStore";

export default {
    created() {
        alert("카카오 성공!");
        this.create();
        // this.kakaoconfirm();
    },
    data() {
        return {
            codes: "",
            user: {
                userinfo_id: null,
                userinfo_password: null,
            },
        };
    },
    props: {
        header: {
            type: String,
            default: require("@/assets/img/profile_city.jpg"),
        },
    },
    computed: {
        ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
        headerStyle() {
            return {
            backgroundImage: `url(${this.header})`,
            };
        },
    },
    methods: {
        ...mapActions(userStore, ["KakaoUserConfirm", "getUserInfo"]),
        async kakaoconfirm() {
            await this.KakaoUserConfirm(this.user);
            let token = sessionStorage.getItem("access-token");
            // console.log("1. confirm() token >> " + token);
            if (this.isLogin) {
                await this.getUserInfo(token);
                // console.log("4. confirm() userInfo :: ", this.userInfo);
                this.$router.push({ name: "index" });
            }
        },
        create() {
            // axios.get(`/kakaologin`).then( 
            //     () => {
                    this.codes = this.$route.query.code;
                    console.log(this.codes);
                    console.log("확인");
            //     }
            // )
            
        },
    }
}
</script>

<style>

</style>