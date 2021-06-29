<template>
    <div
        v-if="rest.coordinators.city"
    >
        <div v-for="city in rest.coordinators.city">
            <statscard
                v-bind:name="city.name"
                v-bind:trips="city.eco_trip_count"
                v-bind:trips_base="city.working_rides_base_count"
                v-bind:km="city.distance"
                v-bind:co2="city.emissions.co2"
            ></statscard>
            <p class="download-data" v-if="city.data_export_url">
                <a v-bind:href="city.data_export_url"> <i class="fas fa-download"></i> Stahnout data o cestách </a>
                <p>
                    Heslo do exportu je <b>{{city.data_export_password}}</b>.
                </p>
            </p>
            <hr/>
        </div>
    </div>
</template>

<script>
import statscard from './statscard.vue';

export default {
    data () { return {
        rest: {
            coordinators: {
                city: false,
            },
        },
    }},
    components: {
        statscard,
    },
    mounted() {
        var vm = this;
        $.getJSON('/rest/coordinators/city',
                  function(data) {
                      vm.$data.rest.coordinators.city = data.results;
        });
    },
}
</script>

<style>
.download-data{
    margin-top: 40px;
}
</style>
