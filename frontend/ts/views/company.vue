<template>
    <div
        v-if="rest.my_company"
    >
        <statscard
            v-bind:icon_url="rest.my_company.icon_url"
            v-bind:frequency="rest.my_company.frequency"
            v-bind:trips="rest.my_company.eco_trip_count"
            v-bind:trips_base="rest.my_company.working_rides_base_count"
            v-bind:km="rest.my_company.distance"
            v-bind:co2="rest.my_company.emissions.co2"
        ></statscard>
        <div class="row">
            <div class="col"></div>
            <div class="col-4">
                <button
                    class="btn btn-success btn-lg btn-record-ride"
                    v-on:click="toggle_trips"
                >
                    <i class="fas fa-receipt"></i>
                    Tabulka jízd
                </button>
            </div>
        </div>
        <div v-if="show_colleague_trips">
            <div v-if="!rest.colleague_trips__loaded">
                Načítá se...
            </div>
            <a v-if="rest.colleague_trips__csv_datalink" v-bind:href="rest.colleague_trips__csv_datalink"> <i class="fas fa-file-csv"></i> CSV</a>
            <tripstable
                v-if="rest.colleague_trips__loaded && rest.commute_modes && rest.this_campaign"
                v-bind:trips="rest.colleague_trips"
                v-bind:days="rest.this_campaign__competition_phase_days"
                v-bind:commute_modes="rest.commute_modes"
            ></tripstable>
        </div>
        <div class="card" v-if="multiple_subsidiaries">
            <div class="card-title">
                <h3>
                Pobočky
                </h3>
            </div>
            <div class="card-body">
                <statscard
                    v-for="subsidiary in rest.my_company.subsidiaries"
                    v-bind:key="subsidiary.id"
                    v-bind:name="subsidiary.address_street"
                    v-bind:icon_url="subsidiary.icon_url"
                    v-bind:frequency="subsidiary.frequency"
                    v-bind:trips="subsidiary.eco_trip_count"
                    v-bind:trips_base="subsidiary.working_rides_base_count"
                    v-bind:km="subsidiary.dinstance"
                    class="subsidiary_stats_card"
                ></statscard>
            </div>
        </div>
    </div>
</template>

<script>
import round from 'vue-round-filter';
import statscard from './statscard.vue';
import tripstable from './tripstable.vue';
import CSV from 'csv.js';

export default {
    data () { return {
        rest: {
            my_company: false,
            colleague_trips: false,
            colleague_trips__loaded: false,
            colleague_trips__csv_datalink: false,
            commute_modes: false,
            this_campaign: false,
            this_campaign__competition_phase_days: false,
        },
        show_colleague_trips: false,
    }},
    filters: {round,},
    components: {
        statscard,
        tripstable,
    },
    mounted() {
        var vm = this;
        $.getJSON('/rest/my_company',
                  function(data) {
                      vm.$data.rest.my_company = data.results[0];
        });
    },
    computed: {
        multiple_subsidiaries () {
            return this.rest.my_company.subsidiaries.length > 1;
        }
    },
    methods: {
        mk_csv() {
            this.rest.colleague_trips__csv_datalink = 'data:application/csv;charset=utf-8,'+ encodeURI(CSV.encode(this.rest.colleague_trips));
        },
        load_trips(data){
            if (this.rest.colleague_trips) {
                this.rest.colleague_trips = this.rest.colleague_trips.concat(data.results);
            } else {
                this.rest.colleague_trips = data.results;
            }
            if(data.next) {
                $.getJSON(data.next, this.load_trips);
            } else {
                this.rest.colleague_trips__loaded = true;
                this.mk_csv();
            }
        },
        toggle_trips() {
            this.show_colleague_trips = !this.show_colleague_trips;
            $.getJSON('/rest/colleague_trips', this.load_trips);
            var vm = this;
            $.getJSON('/rest/commute_mode', function(data){
                vm.rest.commute_modes = data.results;
            });
            $.getJSON('/rest/this_campaign', function(data){
                var competition_phase = null;
                for (var phasei in data.results[0].phase_set) {
                    competition_phase = data.results[0].phase_set[phasei];
                    if(competition_phase.phase_type == "competition") {
                        break;
                    }
                }
                var date = new Date(competition_phase.date_from);
                var end_date = new Date(competition_phase.date_to);
                var days = [];
                while (!(date - end_date == 0)) {
                    date.setDate(date.getDate() + 1)
                    days.push(""+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()))
                }
                vm.rest.this_campaign__competition_phase_days = days;
                vm.rest.this_campaign = data.results[0];
            });
        }
    }
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
.subsidiary_stats_card{
    margin-bottom: 20px;
}
.btn-record-ride {
  color: black !important;
}

.btn-record-ride:hover {
  color: white !important;
 }
</style>
