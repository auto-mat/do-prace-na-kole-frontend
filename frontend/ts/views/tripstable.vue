<template>
    <b-table small :fields="fields" :items="users" responsive="true" small="true" class="overflow-auto">
        <template #cell(subsidiary)="cell">
            <div class="text-nowrap">{{cell.value}}</div>
        </template>
        <template #cell(team)="cell">
            <div class="text-nowrap">{{cell.value}}</div>
        </template>
        <template #cell(user)="cell">
            <div class="text-nowrap">{{cell.value}}</div>
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
                    key: this.days[dayi],
                    label: " " + date.getDate() + "." + (date.getMonth() + 1)
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
                        users[trip.user_attendance][day] = "";
                    }
                    users[trip.user_attendance]["subsidiary"] = trip.subsidiary
                    users[trip.user_attendance]["team"] = trip.team
                    users[trip.user_attendance]["user"] = trip.user
                }
                users[trip.user_attendance][trip.trip_date] = trip.commuteMode;
                if (cms[trip.commuteMode].eco && cms[trip.commuteMode].does_count) {
                    users[trip.user_attendance]._cellVariants[trip.trip_date] = "success"
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
</style>
