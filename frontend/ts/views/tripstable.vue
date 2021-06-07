<template>
    <b-table small :fields="fields" :items="users" responsive=true class="overflow-auto">
        <template #cell()="cell">
            <div v-if="cell.value.commute_mode_icon" class="text-nowrap">
                <img v-bind:src="cell.value.commute_mode_icon" class="commute_mode_icon" />
                {{cell.value.distanceMeters / 1000 | round(1)}} Km
            </div>
            <div v-else class="text-nowrap">{{cell.value}}</div>
        </template>
    </b-table>
</template>

<script>
import round from 'vue-round-filter';

export default {
    computed: {
        fields() {
            var fields = [
                {
                    key: "subsidiary",
                    label: "Pobočka",
                },
                {
                    key: "team",
                    label: "Tým",
                },
                {
                    key: "user",
                    label: "Účastník",
                },
            ];
            for (var dayi in this.days) {
                var date = new Date(this.days[dayi]);
                fields.push({
                    key: this.days[dayi] + "→",
                    label: " " + date.getDate() + "." + (date.getMonth() + 1) + "→"
                });
                fields.push({
                    key: this.days[dayi] + "←",
                    label: "←"
                });
            }
            return fields;
        },
        users() {
            var users = {};
            var cms = {};
            for (var cmi in this.commute_modes) {
                var cm = this.commute_modes[cmi];
                cms[cm.slug] = cm;
            }
            for (var tripi in this.trips) {
                var trip = this.trips[tripi];
                var date = new Date(trip.trip_date);
                trip.trip_date = ""+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())
                if(!(trip.user_attendance in users)) {
                    users[trip.user_attendance] = {"_cellVariants": {}};
                    for (var dayi in this.days) {
                        var day = this.days[dayi];
                        users[trip.user_attendance][day+"→"] = "";
                        users[trip.user_attendance][day+"←"] = "";
                    }
                    users[trip.user_attendance]["subsidiary"] = trip.subsidiary
                    users[trip.user_attendance]["team"] = trip.team
                    users[trip.user_attendance]["user"] = trip.user
                }
                if (cms[trip.commuteMode].eco && cms[trip.commuteMode].does_count) {
                    var dir = trip.direction == "trip_to" ? "→" : "←";
                    users[trip.user_attendance]._cellVariants[trip.trip_date + dir] = "success";
                    trip.commute_mode_icon = cms[trip.commuteMode].icon;
                    users[trip.user_attendance][trip.trip_date + dir] = trip;
                }
            }
            var user_array = [];
            for (var userk in users) {
                var user = users[userk];
                user_array.push(user);
            }
            console.log(user_array)
            return user_array;
        }
    },
    props: ["trips", "days", "commute_modes"],
    filters: {round,},
}
</script>

<style>
.commute_mode_icon {
    height: 1em;
}
</style>
