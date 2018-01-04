all_colors = ['w', 'u', 'b', 'r', 'g'];

var copy_array = function(arr) {
    return arr.slice(0, arr.length);
}

class Player {
    constructor(name, life, colors) {
        this.name = name;
        this.life = life;
        this.colors = colors;
    }

    reset_colors() {
        this.colors = copy_array(all_colors);
    }

    add_color(color) {
        this.colors.push(color);
    }
};

app.controller("myCtrl", ["$scope", function($scope) {
    $scope.message = "Hello"
    $scope.players = Array();
    $scope.starting_life = 20;
    $scope.is_editing = false;
    $scope.all_colors = all_colors;


    var default_player = function() {
        return new Player("Default Player " + ($scope.players.length + 1), 20, copy_array($scope.all_colors));
    }

    var add_player = function() {
        $scope.players.push(default_player());
        console.log($scope.players);
    }
    var get_num_players = function() {
        return $scope.players.length;
    };
    var set_all_life_totals = function(n) {
        for (let i = 0; i < $scope.players.length; i++) {
            $scope.players[i].life = n;
        }

    };

    var add_color = function(player, color) {
        player.colors.push(color);
    }


    $scope.utils = {
        default_player: default_player,
        add_player: add_player,
        get_num_players: get_num_players,
        set_all_life_totals: set_all_life_totals,
        add_color: add_color,
        copy_array: copy_array,
    }

}]);