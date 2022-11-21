<template>
    <div class="kakao">
        <div class="container d-flex justify-content-center align-items-center">
            <div class="card">
                <div class="row">
                    <div class="col-md-6">
                        <b-form class="form"
                            @submit="onSubmit"
                            @reset="OnReset"
                            v-if="show">

                            <h2>회원가입</h2>

                            <div class="inputbox mt-3">
                                <span>이름</span>
                                <input 
                                    type="text"
                                    placeholder="실명입력"
                                    class="form-control"
                                    v-model="form.uname"
                                    required />
                            </div>
                            <div class="inputbox mt-3">
                                <span>이메일</span>
                                <input 
                                    type="text"
                                    v-text="form.email"
                                    v-model="form.email"
                                    class="form-control"
                                    required
                                    disabled />
                            </div>
                            <div class="inputbox mt-3">
                                <span>핸드폰 번호</span>
                                <input 
                                    type="text"
                                    placeholder="010-0000-0000"
                                    name=""
                                    class="form-control" />
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="text-right">
                                    <button
                                        type="submit"
                                        class="btn btn-success register btn-block">
                                        Register
                                    </button>
                                </div>
                                <div class="text-right">
                                    <button type="reset" class="btn btn-success reset btn-block">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </b-form>
                    </div>
                    <div class="col-md-6">
                        <div class="text-center mt-5">
                            <img src="@/assets/img/leaf2.png" alt="" width="40">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    created() {
        this.create();
    },
    data() {
        return {
            codes: "",
            form: {
                password: "",
                email: "",
                uname: "",
            },
            show : true,
        };
    },
    methods: {
        create() {
            this.codes = this.$route.query.code;
            this.getToken();
        },
        login() {
            axios.get("http://localhost/login", this.form)
                .then((res) => {
                    if(res.data != null){
                        document.cookie = `accessToken=${res.data}`;
                        axios.defaults.headers.common["x-access-token"] = res.data;
                        this.$router.push("/");
                    }
                });
        },
        getToken() {
            console.log("gettoken호출");
            axios
                .get("http://localhost/kakaologin?code=" + this.codes)
                .then((res) => {
                    
                    this.form.email = res.data.email;
                    this.form.password = res.data.id;
                    if(this.form.password == undefined){
                        alert("올바르지 못한 접근");
                        this.$router.push("/");
                    }
                    else{
                        this.login();
                    }
                });
        },
        onsubmit(event){
            event.preventDefault();
            axios.post("http://localhost/user/join", this.form).then((res) =>{
                console.log(res.status);
                this.login();
            });
        },
    }
}
</script>

<style>

</style>