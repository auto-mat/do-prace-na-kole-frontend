<template>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <img v-if="icon_url" v-bind:src="icon_url" class="rounded-circle">
            </div>
            <div class="col">
                <div class="row" v-if="name">
                    <b>
                    {{name}}
                    </b>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <div class="row">Pravidelnost</div>
                        <div class="row"><b>{{ frequency * 100 | round }}</b></div>
                    </div>
                    <div class="col-sm">
                        <div class="row">Cesty</div>
                        <div class="row"><b>{{ trips }}</b>/{{ trips_base }}</div>
                    </div>
                    <div class="col-sm">
                        <div class="row">Km</div>
                        <div class="row"><b>{{ km | round(1) }}</b></div>

                    </div>
                </div>
                <div class="row co2" v-if="co2">
                    <div class="col-2">
                        <img v-bind:src="leaf_url" title="Leaf">
                    </div>
                    <div class="col">
                        Společně jste ušetřili <b> {{ co2 }} g </b> CO2
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import round from 'vue-round-filter';

export default {
    data () { return {
        leaf_url: window.frontend_url + "img/leaf.png"
    }},
    props: ["trips", "trips_base", "km", "co2", "icon_url", "frequency", "name"],
    filters: {round,},
}
</script>

<style>
.co2 {
    padding-top: 20px;
}
b {
    margin-left: 3px;
    margin-right: 3px;
}
</style>
