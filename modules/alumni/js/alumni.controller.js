//setter
angular.module('alumni', ['localytics.directives', 'ngBootbox', 'toastersService', 'ngFileUpload', 'programs', 'country']);

'use strict';

// (function () {
//   angular.module('alumni')
//     .controller('alumniController', alumniController);

//   alumniController.$inject = ['$scope', 'alumniFactory', 'countryFactory', 'customsDataTables', '$routeParams', '$window', '$location', '$ngBootbox', 'toasterService', 'Upload', 'programsFactory'];

//   function alumniController($scope, alumniFactory, countryFactory, customsDataTables, $routeParams, $window, $location, $ngBootbox, toasterService, Upload, programsFactory) {
//     // initialize param to object
//     $scope.params = {};

//     let logged_profile = localStorage.getItem('logged_profile');
//     $scope.data_user = JSON.parse(logged_profile);

//     $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    
//     $scope.params.txt_head_form = ($scope.params.txt_id != 0) ? 'Update' : 'Add';
//     $scope.navigation = ($scope.params.txt_id != 0) ? '#/alumni_form/'+$scope.params.txt_id : '#/alumni_form';

//     $scope.url_id = ($scope.params.txt_id == 0 ? '' : '/' + $scope.params.txt_id );
//     $scope.link_url = '#/alumni' + $scope.url_id;

//     $scope.alumni = {};
//     $scope.gender = {};
//     $scope.alumniProfile = {};

//     // DataTables configurable options
//     $scope.dtOptions = customsDataTables.dataTables();

//     $scope.getAlumniProfile = function () {
//       alumniFactory.getAlumniProfile($scope.data_user.person_id)
//       .then(function (res) {
//         console.log(res);
//         $scope.alumniProfile = res.data[0];

//         let homeAddress = $scope.alumniProfile.homeAddress[0];
//         let officeAddress = $scope.alumniProfile.officeAddress[0];

//         $scope.getPersonTitle($scope.alumniProfile.personTitleId);
//         $scope.getCareerOrganizationType($scope.alumniProfile.careerOrganizationTypeId);
//         $scope.getNationalCountry($scope.alumniProfile.nationalityAddressCountryId);
//         $scope.getHomeCountry(homeAddress.addressCountryId);
//         $scope.getOfficeCountry($scope.alumniProfile.officeAddress[0].addressCountryId);

//         $scope.params.image = $scope.alumniProfile.fileName_url;
//         $scope.params.fileSize = $scope.alumniProfile.fileSize;
//         $scope.params.old_image = $scope.alumniProfile.fileName;
//         $scope.params.home_id = $scope.alumniProfile.homeAddressId;
//         $scope.params.office_id = $scope.alumniProfile.officeAddressId;
//         $scope.params.file_id = $scope.alumniProfile.photoFileId;
//         $scope.params.txt_code = $scope.alumniProfile.code;
//         $scope.params.txt_name = ($scope.alumniProfile.name != 0 ? $scope.alumniProfile.name : '' );
//         $scope.params.txt_birth_date = ($scope.alumniProfile.birthDate != '00/00/0000' ? $scope.alumniProfile.birthDate : '');
//         $scope.params.gender_id = $scope.alumniProfile.gender;
//         $scope.params.txt_active = ($scope.alumniProfile.email != 0 ? $scope.alumniProfile.email : '');
//         $scope.params.txt_alternative = ($scope.alumniProfile.otherEmails != 0 ? $scope.alumniProfile.otherEmails : '');
//         $scope.params.txt_facebook = ($scope.alumniProfile.facebook != 0 ? $scope.alumniProfile.facebook : '');
//         $scope.params.txt_twitter = ($scope.alumniProfile.twitter != 0 ? $scope.alumniProfile.twitter : '');
//         $scope.params.txt_linked_in = ($scope.alumniProfile.linkedIn != 0 ? $scope.alumniProfile.linkIn : '');
//         $scope.params.txt_line = ($scope.alumniProfile.line != 0 ? $scope.alumniProfile.line : '');
//         $scope.params.contact_id = $scope.alumniProfile.isContact;

//         $scope.params.txt_home_street_address = (homeAddress.streetAddress != 0 ? homeAddress.streetAddress : '');
//         $scope.params.txt_home_city = (homeAddress.city != 0 ? homeAddress.city : '');
//         $scope.params.txt_home_state_province = (homeAddress.province != 0 ? homeAddress.province : '');
//         $scope.params.txt_home_zip = (homeAddress.zip != 0 ? homeAddress.zip : '');
//         $scope.params.txt_home_tel = (homeAddress.tel!= 0 ? homeAddress.tel : '');
//         $scope.params.txt_home_fax = (homeAddress.fax != 0 ? homeAddress.fax : '');
//         $scope.params.txt_home_mobile = (homeAddress.mobile != 0 ? homeAddress.mobile : '');

//         $scope.params.txt_office_street_address = (officeAddress.streetAddress != 0 ? officeAddress.streetAddress : '');
//         $scope.params.txt_office_city = (officeAddress.city != 0 ? officeAddress.city : '');
//         $scope.params.txt_office_state_province = (officeAddress.province != 0 ? officeAddress.province : '');
//         $scope.params.txt_office_zip = (officeAddress.zip != 0 ? officeAddress.zip : '');
//         $scope.params.txt_office_tel = (officeAddress.tel != 0 ? officeAddress.tel : '');
//         $scope.params.txt_office_mobile = (officeAddress.mobile != 0 ? officeAddress.mobile : '');
//         $scope.params.txt_office_fax = (officeAddress.fax != 0 ? officeAddress.fax : '');

//         if($scope.params.isPreferOfficeContact == 0) {
//           $scope.params.contact_address = $scope.params.txt_home_street_address + ' ' + $scope.params.txt_home_city + ' ' + $scope.params.txt_home_state_province + ' ' + homeAddress.caption + ' ' + $scope.params.txt_home_zip;
//           $scope.params.tel = $scope.params.txt_home_tel;
//           $scope.params.fax = $scope.params.txt_home_fax;
//           $scope.params.mobile = $scope.params.txt_home_mobile;
//         } else {
//           $scope.params.contact_address = $scope.params.txt_office_street_address + ' ' + $scope.params.txt_office_city + ' ' + $scope.params.txt_office_state_province + ' ' + officeAddress.caption + ' ' + $scope.params.txt_office_zip;
//           $scope.params.tel = $scope.params.txt_office_tel;
//           $scope.params.fax = $scope.params.txt_office_fax;
//           $scope.params.mobile = $scope.params.txt_office_mobile;
//         }

//         $scope.params.txt_career_start_date = ($scope.alumniProfile.startYear != 0 ? $scope.alumniProfile.startYear : '');
//         $scope.params.txt_career_position = ($scope.alumniProfile.position != 0 ? $scope.alumniProfile.position : '');
//         $scope.params.txt_career_area_of_expertise = ($scope.alumniProfile.areaOfExpertise != 0 ? $scope.alumniProfile.areaOfExpertise : '');
//         $scope.params.txt_career_ministry = ($scope.alumniProfile.govMinistryName != 0 ? $scope.alumniProfile.govMinistryName : '');

//         if ($scope.alumniProfile.universityName != 0) {
//           $scope.params.txt_career_university = $scope.alumniProfile.universityName;
//           $scope.params.txt_career_department = ($scope.alumniProfile.universityDepartment != 0 ? $scope.alumniProfile.universityDepartment : '');
//         } else {
//           $scope.params.txt_career_university = '';
//           $scope.params.txt_career_department = ($scope.alumniProfile.govDepartmentName != 0 ? $scope.alumniProfile.govDepartmentName : '');
//         }

//         $scope.params.txt_career_organization_name = ($scope.alumniProfile.organizationName != 0 ? $scope.alumniProfile.organizationName : '');
//         $scope.params.txt_career_organization_department = ($scope.alumniProfile.organizationDepartment != 0 ? $scope.alumniProfile.organizationDepartment : '');
//         $scope.params.txt_career_division = ($scope.alumniProfile.division != 0 ? $scope.alumniProfile.division : '');
//       });
//     }

//     $scope.changePassword = function () {
//       let params = {
//         id: $scope.data_user.person_id,
//         newPassword: (typeof $scope.params.txt_new_pwd != 'undefined' ? $scope.params.txt_new_pwd : 0),
//         confirmPassword: (typeof $scope.params.txt_confirm_pwd != 'undefined' ? $scope.params.txt_confirm_pwd : 0),
//       }

//       if (params.newPassword != 0 && params.confirmPassword != 0) {
//         $ngBootbox.confirm('Do you want to save ?')
//           .then(function () {
//             alumniFactory.changePassword(params)
//               .then(function (res) {
//                 if (res.data.status == 1) {
//                   toasterService.toaster_success();
//                   $window.location.href = $scope.link_url;
//                 } else {
//                   toasterService.toaster_remove();
//                 }
//               });
//           }, function () {
//             console.log('cancel');
//           });
//       } else {
//         toasterService.toaster_remove();
//       }
//     }

//     //----------------------------------------------

//     $scope.getNationalCountry = function (countryId = 0) {
//       countryFactory.getCountry()
//         .then(function (res) {
//           $scope.NationalCountry = res.data;
//           if (countryId > 0) {
//             let index = $scope.NationalCountry.findIndex(value => value.id == countryId);
//             $scope.params.national_id = $scope.NationalCountry[index];
//           }
//         });
//     }

//     $scope.getHomeCountry = function (countryId = 0) {
//       countryFactory.getCountry()
//         .then(function (res) {
//           $scope.HomeCountry = res.data;
//           if (countryId > 0) {
//             let index = $scope.HomeCountry.findIndex(value => value.id == countryId);
//             $scope.params.caption_home_id = $scope.HomeCountry[index];
//           }
//         });
//     }

//     $scope.getOfficeCountry = function (countryId = 0) {
//       countryFactory.getCountry()
//         .then(function (res) {
//           $scope.country = res.data;
//           if (countryId > 0) {
//             let index = $scope.country.findIndex(value => value.id == countryId);
//             $scope.params.caption_office_id = $scope.country[index];
//           }
//         });
//     }

//     $scope.getPersonTitle = function (titleId = 0) {
//       alumniFactory.getPersonTitle()
//         .then(function (res) {
//           $scope.ddl_title = res.data;
//           if (titleId > 0) {
//             let index = $scope.ddl_title.findIndex(value => value.id == titleId);
//             $scope.params.title_id = $scope.ddl_title[index];
//           }
//         });
//     }

//     $scope.getGender = function () {
//       alumniFactory.getGender()
//         .then(function (res) {
//           $scope.gender = res.data;
//           if ($scope.params.txt_id == 0) {
//             $scope.params.gender_id = 0;
//           }
//         });
//     }

//     $scope.getCareerOrganizationType = function (organizationId = 0) {
//       alumniFactory.getCareerOrganizationType()
//         .then(function (res) {
//           $scope.organization = res.data;
//           if (organizationId > 0) {
//             let index = $scope.organization.findIndex(value => value.id == organizationId);
//             $scope.params.organization_id = $scope.organization[index];
//           }
//         });
//     }

//     $scope.submit = function () {
//       let image = 0;
//       let image_size = 0;
//       let old_image = 0;
//       let ministry = 0;
//       let universityName = 0;
//       let careerDepartment = 0;
//       let organizationName = 0;
//       let organizationDepartment = 0;

//       if (typeof $scope.params.old_image != 'undefined') {
//         old_image = $scope.params.old_image;
//       }

//       if ($scope.params.txt_id != 0) {
//         image = old_image;
//         image_size = $scope.params.fileSize;
//       } else {
//         if (typeof $scope.params.image != 'undefined') {
//           image = $scope.params.image;
//           image_size = $scope.params.image.size;
//         }
//       }

//       let national_id = (typeof $scope.params.national_id != 'undefined' && typeof $scope.params.national_id.id != 'undefined' ? $scope.params.national_id.id : 0);

//       let caption_home_id = (typeof $scope.params.caption_home_id != 'undefined' && typeof $scope.params.caption_home_id.id != 'undefined' ? $scope.params.caption_home_id.id : 0);

//       let caption_office_id = (typeof $scope.params.caption_office_id != 'undefined' && typeof $scope.params.caption_office_id.id != 'undefined' ? $scope.params.caption_office_id.id : 0);

//       let title_id = (typeof $scope.params.title_id != 'undefined' && typeof $scope.params.title_id.id != 'undefined' ? $scope.params.title_id.id : 0);

//       let organization_id = (typeof $scope.params.organization_id != 'undefined' && typeof $scope.params.organization_id.id != 'undefined' ? $scope.params.organization_id.id : 0);

//       if(organization_id == 1 || organization_id == 3) {
//         if (organization_id == 1) {
//           ministry = (typeof $scope.params.txt_career_ministry != 'undefined' ? $scope.params.txt_career_ministry : '0');
//           universityName = 0;
//         } else {
//           universityName = (typeof $scope.params.txt_career_university != 'undefined' ? $scope.params.txt_career_university : '0');
//           ministry = 0;
//         }
//         careerDepartment = (typeof $scope.params.txt_career_department != 'undefined' ? $scope.params.txt_career_department : '0');
//         organizationName = 0;
//         organizationDepartment = 0;
//       } else {
//         organizationName = (typeof $scope.params.txt_career_organization_name != 'undefined' ? $scope.params.txt_career_organization_name : '0');
//         organizationDepartment = (typeof $scope.params.txt_career_organization_department != 'undefined' ? $scope.params.txt_career_organization_department : '0')
//         ministry = 0;
//         universityName = 0;
//         careerDepartment = 0;
//       }

//       let params = {
//         id: $scope.params.txt_id,
//         homeId: $scope.params.home_id,
//         officeId: $scope.params.office_id,
//         fileId: $scope.params.file_id,
//         imageSize: image_size,
//         image: image,
//         old_image: old_image,
//         code: (typeof $scope.params.txt_code != 'undefined' ? $scope.params.txt_code : '0'),
//         homeStreetAddress: (typeof $scope.params.txt_home_street_address != 'undefined' ? $scope.params.txt_home_street_address : '0'),
//         homeCity: (typeof $scope.params.txt_home_city != 'undefined' ? $scope.params.txt_home_city : '0'),
//         homeProvince: (typeof $scope.params.txt_home_state_province != 'undefined' ? $scope.params.txt_home_state_province : '0'),
//         homeCountry: caption_home_id,
//         homeZip: (typeof $scope.params.txt_home_zip != 'undefined' ? $scope.params.txt_home_zip : '0'),
//         homeTel: (typeof $scope.params.txt_home_tel != 'undefined' ? $scope.params.txt_home_tel : '0'),
//         homeFax: (typeof $scope.params.txt_home_fax != 'undefined' ? $scope.params.txt_home_fax : '0'),
//         homeMobile: (typeof $scope.params.txt_home_mobile != 'undefined' ? $scope.params.txt_home_mobile : '0'),
//         officeStreetAddress: (typeof $scope.params.txt_office_street_address != 'undefined' ? $scope.params.txt_office_street_address : '0'),
//         officeCity: (typeof $scope.params.txt_office_city != 'undefined' ? $scope.params.txt_office_city : '0'),
//         officeProvince: (typeof $scope.params.txt_office_state_province != 'undefined' ? $scope.params.txt_office_state_province : '0'),
//         officeCountry: caption_office_id,
//         officeZip: (typeof $scope.params.txt_office_zip != 'undefined' ? $scope.params.txt_office_zip : '0'),
//         officeTel: (typeof $scope.params.txt_office_tel != 'undefined' ? $scope.params.txt_office_tel : '0'),
//         officeFax: (typeof $scope.params.txt_office_fax != 'undefined' ? $scope.params.txt_office_fax : '0'),
//         officeMobile: (typeof $scope.params.txt_office_mobile != 'undefined' ? $scope.params.txt_office_mobile : '0'),
//         title: title_id,
//         name: (typeof $scope.params.txt_name != 'undefined' ? $scope.params.txt_name : '0'),
//         gender: (typeof $scope.params.gender_id != 'undefined' ? $scope.params.gender_id : '0'),
//         birthday: (typeof $scope.params.txt_birth_date != 'undefined' ? $scope.params.txt_birth_date : '0'),
//         email: (typeof $scope.params.txt_active != 'undefined' ? $scope.params.txt_active : '0'),
//         otherEmails: (typeof $scope.params.txt_alternative != 'undefined' ? $scope.params.txt_alternative : '0'),
//         facebook: (typeof $scope.params.txt_facebook != 'undefined' ? $scope.params.txt_facebook : '0'),
//         twitter: (typeof $scope.params.txt_twitter != 'undefined' ? $scope.params.txt_twitter : '0'),
//         linked_in: (typeof $scope.params.txt_linked_in != 'undefined' ? $scope.params.txt_linked_in : '0'),
//         line: (typeof $scope.params.txt_line != 'undefined' ? $scope.params.txt_line : '0'),
//         ContactAddress: (typeof $scope.params.contact_id != 'undefined' ? $scope.params.contact_id : '0'),
//         nationCountry: national_id,
//         careerPosition: (typeof $scope.params.txt_career_position != 'undefined' ? $scope.params.txt_career_position : '0'),
//         careerStartYear: (typeof $scope.params.txt_career_start_date != 'undefined' ? $scope.params.txt_career_start_date : '0'),
//         careerExpertise: (typeof $scope.params.txt_career_area_of_expertise != 'undefined' ? $scope.params.txt_career_area_of_expertise : '0'),
//         careerMinistry: ministry,
//         careerDepartment: careerDepartment,
//         careerOrganizationName: organizationName,
//         careerOrganizationDepartment: organizationDepartment,
//         careerUniversityName: universityName,
//         careerUniversityDepartment: careerDepartment,
//         careerOrganizationType: organization_id,
//         careerDivision: (typeof $scope.params.txt_career_division != 'undefined' ? $scope.params.txt_career_division : '0'),
//       }
//       // console.log(params);

//       $ngBootbox.confirm('Do you want to save ?')
//         .then(function () {
//           alumniFactory.setAlumni(params)
//             .then(function (res) {
//               if (res.data.status == 1) {
//                 toasterService.toaster_success();
//                 $window.location.href = $scope.link_url;
//               }
//             });
//         }, function () {
//           console.log('cancel');
//         });
//     }



//     $scope.deleteAlumni = function () {
//       $ngBootbox.confirm('Do you want to delete ?')
//         .then(function () {
//           alumniFactory.deleteAlumni($scope.params.txt_id)
//             .then(function (res) {
//               if (res.data.status == 1) {
//                 toasterService.toaster_success();
//                 $window.location.href = '#/alumni';
//               } else {
//                 toasterService.toaster_remove();
//               }
//             });
//         }, function () {
//           console.log('cancel');
//         });
//     }

//     $scope.getPrograms = function (programId = 0) {
//       let programDepartmentId = (typeof $scope.params.ddl_dept != 'undefined' && typeof $scope.params.ddl_dept.id != 'undefined' ? $scope.params.ddl_dept.id : 0);
//       let params = {
//         txt_code: 0,
//         txt_title: 0,
//         programDepartmentId: 0
//       }
      
//       programsFactory.getPrograms(params)
//         .then(function (res) {
//           $scope.Programs = res.data;
//           if (programId > 0) {
//             let index = $scope.Programs.findIndex(value => value.id == programId);
//             $scope.params.program_id = $scope.Programs[index];
//           }
//         });
//     }

//   }

// })();