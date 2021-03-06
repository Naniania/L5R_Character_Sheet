  angular.module('myApp').controller('MainController', ['$scope', 'ModalService', 'DataService', 'LoadCharacterService', function($scope, ModalService, DataService, LoadCharacterService) {

    $scope.test = "Main Controller";
    $scope.characterSize = DataService.characterSize(); 
    
    $scope.character = DataService.character();
    $scope.dataServiceCharacter = DataService.character();

    $scope.updateChar = function() {
      $scope.dataServiceCharacter = DataService.character();
      $scope.characterSize = DataService.characterSize(); 
      console.log("Character: " + JSON.stringify($scope.character, null, '\t'));
      console.log("Character Size: " + $scope.characterSize);
    };
    
    $scope.close = function(result) {
      console.log("MainController Result: " + result);
      close(result, 500); 
    };

    $scope.enteredPointsValue = null;

    $scope.show = function() {
      ModalService.showModal({
        templateUrl: "templates/modal.html",
        controller: "ModalController",
        inputs : {
          dataOne: "Foo Bar",
          dataTwo: "Flim Flam",
          dataThree: ['Aaa', 'Bbb', 'Ccc'],
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("Show Result: " + result);
        });
      }); 
    };


    $scope.showClansListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/clans_list.html",
        controller: "ClansController",
        inputs : {
          clansMasterList: DataService.clansMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(clanId) {
          //  If we have selected a clan, set it.
          if(clanId != null) {
            console.log("Show Clan Id: " + clanId);
            $scope.character.clan_id = clanId;
            $scope.calculateBonus( DataService.getClanFromMasterList(clanId).bonus );
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Clan Id");
          }
        });
      }); 
    };


    $scope.showWeaponsOneListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/weapons_list.html",
        controller: "WeaponsOneController",
        inputs : {
          weaponsMasterList: DataService.weaponsMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(weaponId) {
          //  If we have selected a weapon, set it.
          if(weaponId != null) {
            console.log("Show Weapon Id: " + weaponId);
            $scope.character.weapon_one.id = weaponId;
            $scope.character.weapon_one.name = DataService.getWeaponFromMasterList(weaponId, 'name');
            $scope.character.weapon_one.type = DataService.getWeaponFromMasterList(weaponId, 'type');
            $scope.character.weapon_one.attack_roll = DataService.getWeaponFromMasterList(weaponId, 'attack_roll');
            $scope.character.weapon_one.damage_roll = DataService.getWeaponFromMasterList(weaponId, 'dr');
            $scope.character.weapon_one.bonus = DataService.getWeaponFromMasterList(weaponId, 'bonus');
            $scope.character.weapon_one.notes = DataService.getWeaponFromMasterList(weaponId, 'notes');
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Weapon Id");
          }
        });
      }); 
    };


    $scope.showWeaponsTwoListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/weapons_list.html",
        controller: "WeaponsTwoController",
        inputs : {
          weaponsMasterList: DataService.weaponsMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(weaponId) {
          //  If we have selected a weapon, set it.
          if(weaponId != null) {
            console.log("Show Weapon Id: " + weaponId);
            $scope.character.weapon_two.id = weaponId;
            $scope.character.weapon_two.name = DataService.getWeaponFromMasterList(weaponId, 'name');
            $scope.character.weapon_two.type = DataService.getWeaponFromMasterList(weaponId, 'type');
            $scope.character.weapon_two.attack_roll = DataService.getWeaponFromMasterList(weaponId, 'attack_roll');
            $scope.character.weapon_two.damage_roll = DataService.getWeaponFromMasterList(weaponId, 'dr');
            $scope.character.weapon_two.bonus = DataService.getWeaponFromMasterList(weaponId, 'bonus');
            $scope.character.weapon_two.notes = DataService.getWeaponFromMasterList(weaponId, 'notes');
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Weapon Id");
          }
        });
      }); 
    };


    $scope.showFamiliesListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/family_list.html",
        controller: "FamiliesController",
        inputs: {
          familiesMasterList: DataService.familiesMasterList(),
          modalMessage : message,
          filterBy : filterBy, 
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(familyId) {
          if(familyId != null) {
            console.log("Show Family Id: " + familyId);
            $scope.character.family_id = familyId;
            $scope.calculateBonus( DataService.getFamilyFromMasterList(familyId).bonus );
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Family Id");
          }
        });
      }); 
    };
    

    $scope.showSchoolsListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/school_list.html",
        controller: "SchoolsController",
        inputs: {
          schoolsMasterList: DataService.schoolsMasterList(),
          modalMessage: message,
          filterBy: filterBy,
        }
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(schoolId) {
          if( schoolId != null ) {
            console.log("Show School Id: " + schoolId);
            $scope.character.school_id = schoolId;
            $scope.calculateBonus( DataService.getSchoolFromMasterList(schoolId).bonus );
            $scope.character = DataService.updateCharacter($scope.character);      
          } else {
            console.log("No School Id");
          }
        });
      }); 
    };


    $scope.showSkillsListModal = function(message, searchText, filterBy, rank, school_skill) {
      ModalService.showModal({
        templateUrl: "templates/skill_list.html",
        controller: "SkillsModalListController",
        inputs : {
          skillsMasterList: DataService.skillsMasterList(),
          modalMessage : message,
          skillSearchText : searchText,          
          filterBy: filterBy,
          rank: rank,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(skillId) {
          if( skillId != null && ( skillId.rank == null || skillId.rank == undefined ) ) {
            console.log("Show Skill Id: " + skillId);
            $scope.addASkill(skillId, null, null, school_skill);
            $scope.character = DataService.updateCharacter($scope.character);
          } else if ( skillId.id != null && skillId.rank != null ) {
            console.log("Show Skill Id: " + skillId.id + " Show Rank: " + skillId.rank );
            $scope.addASkill(skillId.id, skillId.rank, null, school_skill);
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("Error No SKill Added");
            console.log("skillId Object: " + JSON.stringify(skillId));
          }
        });
      }); 
    };


    $scope.showArrowsListModal = function(num, message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/arrows_list.html",
        controller: "ArrowsController",
        inputs : {
          arrowsMasterList: DataService.arrowsMasterList(),
          num: num,
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(arrowId) {
          //  If we have selected a clan, set it.
          if(arrowId != null) {
            console.log("Show Arrow Num " + num + " Id: " + arrowId);
            $scope.character.arrows[num].id = arrowId;
            $scope.character.arrows[num].type = DataService.getArrowFromMasterList(arrowId, 'name');
            $scope.character.arrows[num].damage = DataService.getArrowFromMasterList(arrowId, 'damage_roll');
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Arrow Id");
          }
        });
      }); 
    };


    $scope.showArmorListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/armor_list.html",
        controller: "ArmorController",
        inputs : {
          armorMasterList: DataService.armorMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(armorId) {
          //  If we have selected a clan, set it.
          if(armorId != null) {
            console.log("Show Armor Id: " + armorId);
            $scope.character.armor = DataService.getArmorFromMasterList(armorId);
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Armor Id");
          }
        });
      }); 
    };


    $scope.showAdvantagesListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/advantages_list.html",
        controller: "AdvantagesController",
        inputs : {
          advantagesMasterList: DataService.advantagesMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(advantageId) {
          //  If we have selected a advantage, set it.
          if(advantageId != null) {
            console.log("Show Advantage Id: " + advantageId);
            var adv = DataService.getAdvantageFromMasterList(advantageId);
            var cost = $scope.calculateAdvantagesDisadvantagesCost(adv, "advantage");
            $scope.character.advantages.push( {id:advantageId, name:adv.name, subtype:adv.subtype, points:cost, notes:adv.notes } );
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Advantage Id");
          }
        });
      }); 
    };


    $scope.showDisadvantagesListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/disadvantages_list.html",
        controller: "DisadvantagesController",
        inputs : {
          disadvantagesMasterList: DataService.disadvantagesMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(disadvantageId) {
          //  If we have selected a disadvantage, set it.
          if(disadvantageId != null) {
            console.log("Show disadvantage Id: " + disadvantageId);
            var dadv = DataService.getDisadvantageFromMasterList(disadvantageId);
            var cost = $scope.calculateAdvantagesDisadvantagesCost(dadv, "disadvantage");            
            $scope.character.disadvantages.push( {id:disadvantageId, name:dadv.name, subtype:dadv.subtype, points:cost, notes:dadv.notes} );
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Disadvantage Id");
          }
        });
      }); 
    };
    

    $scope.loadCharacterModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/character_load.html",
        controller: "CharacterLoadController",
        inputs: {
          modalMessage: message,
          filterBy: filterBy,
          characterLoadList: LoadCharacterService.loadCharacters(),
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("loadCharacterModal Result: " + result);          
          $scope.character = DataService.updateCharacter( LoadChararacterService.getSavedCharacter() );
        });
      }); 
    };


    $scope.showEnterPointsModal = function(message, filterBy, pointsArray, da_obj, string) {
      ModalService.showModal({
        templateUrl: "templates/points_questions.html",
        controller: "PointsQuestionController",
        inputs : {
          pointsMasterList: pointsArray,
          modalMessage: message,
          filterBy: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(pointsValue) {
          //  If we have selected a value, set it.
          if(pointsValue != null) {
            console.log("Show points value: " + pointsValue);
            $scope.enteredPointsValue = pointsValue;
            $scope.character.experience_points -= pointsValue;
            if ( string == "advantage" ) {
              var index = $scope.getCharacterAdvantageIndexById(da_obj.id);
              $scope.character.advantages[index].points = pointsValue;            
            } else if ( string == 'disadvantage' ) {
              var index = $scope.getCharacterDisadvantageIndexById(da_obj.id);
              $scope.character.disadvantages[index].points = pointsValue;            
            }
            $scope.character = DataService.character($scope.character);
            return parseInt(pointsValue);            
          } else {
            console.log("No Dis/Advantage Id");
            return null;
          }
        });
      }); 
    };


    $scope.getCharacterAdvantageIndexById = function(id) {
      for( var i = 0; i < $scope.character.advantages.length; i++ ) {
        if( $scope.character.advantages[i].id == id ) {
          return i; 
        }
      }
    };


    $scope.getCharacterDisadvantageIndexById = function(id) {
      for( var i = 0; i < $scope.character.disadvantages.length; i++ ) {
        if( $scope.character.disadvantages[i].id == id ) {
          return i; 
        }
      }
    };


    $scope.saveCharacter = function() {
      console.log("Save Current Character");
      LoadCharacterService.saveCharacter($scope.character);
    };

    
    $scope.updateWoundPoints = function() {
        DataService.character($scope.character);
    };
    
   
    $scope.calculateAdvantagesDisadvantagesCost = function(obj, string, no_modals_flag) {
      var points = obj.points;
      var cost = null;
      console.log("Points : " + JSON.stringify(points));
      if ( points.all == 'var' || points.else == 'var' ) {
        var entered_value = 0;
        if ( ! no_modals_flag ) {
          if ( string == 'advantage' ) {
            entered_value = $scope.showEnterPointsModal("Choose a point value for your selection: " + obj.name, null, [1,2,3,4,5,6,7,8], obj , string);
          } else if ( string == 'disadvantage' ) {
            entered_value = $scope.showEnterPointsModal("Choose a point value for your selection: " + obj.name, null, [-1,-2,-3,-4,-5,-6,-7,-8], obj , string);
          }
          cost = entered_value;
        } else {
          cost = "Varies";
        }
      } else if ( points.all != null && points['all'].toString().match(/:/) != null ) {
        var points_array = points.all.toString().split(':');
        if ( ! no_modals_flag ) {
          $scope.showEnterPointsModal("Choose a point value for your selection: " + obj.name, null, points_array, obj ,string);
        } else {
          cost = points.all.toString();
        }
      } else if ( points.else != null && points['else'].toString().match(/:/) != null ) {
        var points_array = points.else.toString().split(':');
        if ( ! no_modals_flag ) {
          $scope.showEnterPointsModal("Choose a point value for your selection: " + obj.name, null, points_array, obj, string);
        } else {
          cost = points.else.toString();
        }
      } else if ( points.all != null ) {
        cost = points.all;
      } else if ( points[$scope.character.clan.name.toLowerCase()] ) {
        console.log("Found Clan Name");
        cost = points[$scope.character.clan.name.toLowerCase()];   
      } else if ( points.else ) {
        cost = points['else'];
      }
      if ( cost ) {
        console.log("Calc Point Cost : " + cost);
        $scope.character.experience_points -= cost;
        $scope.character = DataService.character($scope.character);
      }
      return cost;
    };


    $scope.calculateBonus = function(obj) {
      var key;
      for( key in obj ) {
        console.log("KEY : " + key + "  VALUE: " + obj[key]);
        switch(key) {
          case 'void':
            $scope.character.void +=  obj[key];
            $scope.character.void_s +=  obj[key];
            break;
          case 'stamina':
            $scope.character.stamina +=  obj[key];
            $scope.character.stamina_s +=  obj[key];
            break;
          case 'willpower':
            $scope.character.willpower +=  obj[key];
            $scope.character.willpower_s +=  obj[key];
            break;
          case 'reflexes':
            $scope.character.reflexes +=  obj[key];
            $scope.character.reflexes_s +=  obj[key];
            break;
          case 'awareness':
            $scope.character.awareness +=  obj[key];
            $scope.character.awareness_s +=  obj[key];
            break;
          case 'agility':
            $scope.character.agility +=  obj[key];
            $scope.character.agility_s +=  obj[key];
            break;
          case 'intelligence':
            $scope.character.intelligence +=  obj[key];
            $scope.character.intelligence_s +=  obj[key];
            break;
          case 'strength':
            $scope.character.strength +=  obj[key];
            $scope.character.strength_s +=  obj[key];
            break;
          case 'perception':
            $scope.character.perception +=  obj[key];
            $scope.character.perception_s +=  obj[key];
            break;
          case 'honor':
            $scope.character.honor +=  obj[key];
            break;
          case 'affinity':
            var ring = obj[key];
            $scope.character.spell_affinity[ring] = true;
            break;
          case 'deficiency':
            var ring = obj[key];
            $scope.character.spell_deficiency[ring] = true;
            break;
          case 'key_word':
            $scope.character.key_word_bonus.push(obj[key]);
            break;
          case 'skills':
              for(var i=0; i < obj[key].length; i++ ) {
                //console.log("Add this skill: " + obj[key][i] );
                var skill =  obj[key][i];
                var school_skill = true;
                if ( isFinite(skill) ) {
                  $scope.addASkill(skill, 1, null, school_skill);
                } else if ( skill.match(/:/) ) {
                  var arr = skill.split(":");
                  var skill = parseInt(arr[0]);
                  var emp = (arr[1]) ? parseInt(arr[1]) : null;
                  var lvl = (arr[2]) ? parseInt(arr[2]) : 1;                  
                  $scope.addASkill(skill, lvl, emp, school_skill);
                } else {
                  $scope.close(true,500);
                  //alert("You Also Get " + skill + " skill");
                  //$scope.showSkillsListModal = function(message, searchText, filterBy, rank) {
                  var message = "You also get a " + skill + " skill.";
                  var searchText = skill.replace(/\+. /, "");
                  var filter = null;
                  var rank = 1;
                  if ( searchText.match(/ |any|or/ig)) {
                    searchText = null;
                  }
                  console.log("showSkillsListModal message:" + message + "  searchText:" + searchText + "  filter:" + filter + "  rank:" + rank);
                  $scope.showSkillsListModal(message, searchText, filter, rank, school_skill);
                }
              }
            break;
          case 'techniques':
            var school = DataService.getSchoolFromMasterList($scope.character.school_id);
            console.log("Techniques: " + JSON.stringify(school.bonus.techniques));
            var techniques = school.bonus.techniques;
            for( var id in techniques ) {
              console.log("Push Tech: " + techniques[id] );
              $scope.character.school_techniques.push(techniques[id]);
            }
            // Add these to the character at each level and display them on the character sheet somewhere.
            break;
        }
      }
      $scope.character = DataService.updateCharacter($scope.character);
    };


    $scope.addASkill = function(skill_id, rank, emp, school_skill_flag) {
      //console.log("Add A Skill:  id:" + skill_id + "  rank:" + rank + "  emp:" + emp + " School Skill:" + school_skill_flag);
      var skill = DataService.getSkillFromMasterList(skill_id);
      var lvl = ( rank )? rank : 0;
      var emph = ( emp != null || emp != undefined  ) ? emp : null;
      var school_skill = ( school_skill_flag != null || school_skill_flag != undefined  ) ? school_skill_flag : false;
      if ( emph != null ) {
        emph = skill.emphases[emph];
      }
      var new_skill = { id:skill_id, rank:lvl, rank_s:lvl, emphasis:emph, school_skill:school_skill_flag, get roll() { return (getSkillRoll(this.id, this.rank)); }, get mastery() { return skillMastery(this); } };
      if ( $scope.getCharacterSkillById(skill_id) === null) {
        $scope.character.skills.push(new_skill);
      }
      $scope.character = DataService.updateCharacter($scope.character);
      $scope.close(true, 500);
    };


    $scope.getCharacterSkillById = function(skill_id) {
      for(var i = 0; i < $scope.character.skills.length; i++) {
        if ( $scope.character.skills[i] != undefined ) {
          if ( $scope.character.skills[i].id === skill_id ) {
            return $scope.character.skills[i];
          }
        }
      }
      return null;
    };


    var getSkillRoll = function(skill_id, skill_rank) {
      var skill = DataService.getSkillFromMasterList(skill_id);
      if ( skill ) {
        var trait = skill.trait;
        var ring  = skill.ring;
        var roll =  ( skill_rank + $scope.character[trait] ) + "K" + $scope.character[ring];
        return roll;
      } else {
        return '0K0';
      }
    };


    var skillMastery = function(obj) {
      var master_skill = DataService.getSkillFromMasterList(obj.id);
      if ( master_skill ) {
        var text = '';
        for(var x in master_skill.masteries ) {
          if ( obj.rank >= x ) {
            text += "Level " + x + " : " + master_skill.masteries[x] + "<br />\n";
          }
        }
        return text;
      } else {
        return 'none';
      }
    };


    $scope.getSkill = function(skill_id, attr) {
        return DataService.getSkillFromMasterList(skill_id, attr);
    };


    $scope.removeAdvantage = function(advantage_id) {
      for( var i=0; i < $scope.character.advantages.length; i++) {
        if ( $scope.character.advantages[i].id == advantage_id ) {
          var point_cost = $scope.character.advantages[i].points;
          console.log("Point Cost: " + point_cost);
          console.log("Exp Points: " + $scope.character.experience_points);
          $scope.character.experience_points += point_cost;
          $scope.character.advantages.splice(i,1);
          $scope.character = DataService.updateCharacter($scope.character);
          console.log("Exp Points: " + $scope.character.experience_points);
        }
      }
    };


    $scope.removeDisadvantage = function(disadvantage_id) {
      for( var i=0; i < $scope.character.disadvantages.length; i++) {
        if ( $scope.character.disadvantages[i].id == disadvantage_id ) {
          var point_cost = $scope.character.disadvantages[i].points;
          console.log("Point Cost: " + point_cost);
          console.log("Exp Points: " + $scope.character.experience_points);
          $scope.character.experience_points += point_cost;
          $scope.character.disadvantages.splice(i,1);
          $scope.character = DataService.updateCharacter($scope.character);
          console.log("Exp Points: " + $scope.character.experience_points);
        }
      }
    };


  }]);//end main controller
