angular.module('alumni')
  .controller('alumniModalController', alumniModalController);

alumniModalController.$inject = ['$scope', '$ngBootbox', 'alumniFactory', 'countryFactory', 'params', 'close'];

function alumniModalController($scope, $ngBootbox, alumniFactory, countryFactory, params, close) {
  // initialize param to object
  $scope.params = {};
  $scope.params.txt_id = params.id;

  $scope.getAlumniProfile = function () {
    alumniFactory.getAlumniProfile($scope.params.txt_id)
      .then(function (res) {
        console.log(res);
        $scope.alumniProfile = res.data[0];

        let homeAddress = $scope.alumniProfile.homeAddress[0];
        let officeAddress = $scope.alumniProfile.officeAddress[0];

        $scope.getPersonTitle($scope.alumniProfile.personTitleId);
        $scope.getCareerOrganizationType($scope.alumniProfile.careerOrganizationTypeId);
        $scope.getNationalCountry($scope.alumniProfile.nationalityAddressCountryId);
        $scope.getHomeCountry(homeAddress.addressCountryId);
        $scope.getOfficeCountry($scope.alumniProfile.officeAddress[0].addressCountryId);

        $scope.params.image = $scope.alumniProfile.fileName_url;
        $scope.params.fileSize = $scope.alumniProfile.fileSize;
        $scope.params.old_image = $scope.alumniProfile.fileName;
        $scope.params.home_id = $scope.alumniProfile.homeAddressId;
        $scope.params.office_id = $scope.alumniProfile.officeAddressId;
        $scope.params.file_id = $scope.alumniProfile.photoFileId;
        $scope.params.txt_code = $scope.alumniProfile.code;
        $scope.params.txt_name = ($scope.alumniProfile.name != 0 ? $scope.alumniProfile.name : '');
        $scope.params.txt_birth_date = ($scope.alumniProfile.birthDate != '00/00/0000' ? $scope.alumniProfile.birthDate : '');
        $scope.params.gender_id = $scope.alumniProfile.gender;
        $scope.params.txt_active = ($scope.alumniProfile.email != 0 ? $scope.alumniProfile.email : '');
        $scope.params.txt_alternative = ($scope.alumniProfile.otherEmails != 0 ? $scope.alumniProfile.otherEmails : '');
        $scope.params.txt_facebook = ($scope.alumniProfile.facebook != 0 ? $scope.alumniProfile.facebook : '');
        $scope.params.txt_twitter = ($scope.alumniProfile.twitter != 0 ? $scope.alumniProfile.twitter : '');
        $scope.params.txt_linked_in = ($scope.alumniProfile.linkedIn != 0 ? $scope.alumniProfile.linkIn : '');
        $scope.params.txt_line = ($scope.alumniProfile.line != 0 ? $scope.alumniProfile.line : '');
        $scope.params.contact_id = $scope.alumniProfile.isContact;

        $scope.params.txt_home_street_address = (homeAddress.streetAddress != 0 ? homeAddress.streetAddress : '');
        $scope.params.txt_home_city = (homeAddress.city != 0 ? homeAddress.city : '');
        $scope.params.txt_home_state_province = (homeAddress.province != 0 ? homeAddress.province : '');
        $scope.params.txt_home_zip = (homeAddress.zip != 0 ? homeAddress.zip : '');
        $scope.params.txt_home_tel = (homeAddress.tel != 0 ? homeAddress.tel : '');
        $scope.params.txt_home_fax = (homeAddress.fax != 0 ? homeAddress.fax : '');
        $scope.params.txt_home_mobile = (homeAddress.mobile != 0 ? homeAddress.mobile : '');

        $scope.params.txt_office_street_address = (officeAddress.streetAddress != 0 ? officeAddress.streetAddress : '');
        $scope.params.txt_office_city = (officeAddress.city != 0 ? officeAddress.city : '');
        $scope.params.txt_office_state_province = (officeAddress.province != 0 ? officeAddress.province : '');
        $scope.params.txt_office_zip = (officeAddress.zip != 0 ? officeAddress.zip : '');
        $scope.params.txt_office_tel = (officeAddress.tel != 0 ? officeAddress.tel : '');
        $scope.params.txt_office_mobile = (officeAddress.mobile != 0 ? officeAddress.mobile : '');
        $scope.params.txt_office_fax = (officeAddress.fax != 0 ? officeAddress.fax : '');

        if ($scope.params.isPreferOfficeContact == 0) {
          $scope.params.contact_address = $scope.params.txt_home_street_address + ' ' + $scope.params.txt_home_city + ' ' + $scope.params.txt_home_state_province + ' ' + homeAddress.caption + ' ' + $scope.params.txt_home_zip;
          $scope.params.tel = $scope.params.txt_home_tel;
          $scope.params.fax = $scope.params.txt_home_fax;
          $scope.params.mobile = $scope.params.txt_home_mobile;
        } else {
          $scope.params.contact_address = $scope.params.txt_office_street_address + ' ' + $scope.params.txt_office_city + ' ' + $scope.params.txt_office_state_province + ' ' + officeAddress.caption + ' ' + $scope.params.txt_office_zip;
          $scope.params.tel = $scope.params.txt_office_tel;
          $scope.params.fax = $scope.params.txt_office_fax;
          $scope.params.mobile = $scope.params.txt_office_mobile;
        }

        $scope.params.txt_career_start_date = ($scope.alumniProfile.startYear != 0 ? $scope.alumniProfile.startYear : '');
        $scope.params.txt_career_position = ($scope.alumniProfile.position != 0 ? $scope.alumniProfile.position : '');
        $scope.params.txt_career_area_of_expertise = ($scope.alumniProfile.areaOfExpertise != 0 ? $scope.alumniProfile.areaOfExpertise : '');
        $scope.params.txt_career_ministry = ($scope.alumniProfile.govMinistryName != 0 ? $scope.alumniProfile.govMinistryName : '');

        if ($scope.alumniProfile.universityName != 0) {
          $scope.params.txt_career_university = $scope.alumniProfile.universityName;
          $scope.params.txt_career_department = ($scope.alumniProfile.universityDepartment != 0 ? $scope.alumniProfile.universityDepartment : '');
        } else {
          $scope.params.txt_career_university = '';
          $scope.params.txt_career_department = ($scope.alumniProfile.govDepartmentName != 0 ? $scope.alumniProfile.govDepartmentName : '');
        }

        $scope.params.txt_career_organization_name = ($scope.alumniProfile.organizationName != 0 ? $scope.alumniProfile.organizationName : '');
        $scope.params.txt_career_organization_department = ($scope.alumniProfile.organizationDepartment != 0 ? $scope.alumniProfile.organizationDepartment : '');
        $scope.params.txt_career_division = ($scope.alumniProfile.division != 0 ? $scope.alumniProfile.division : '');
      });
  }

  $scope.getPersonTitle = function (titleId = 0) {
    alumniFactory.getPersonTitle()
      .then(function (res) {
        $scope.ddl_title = res.data;
        if (titleId > 0) {
          let index = $scope.ddl_title.findIndex(value => value.id == titleId);
          $scope.params.title_id = $scope.ddl_title[index];
        }
      });
  }

  $scope.getCareerOrganizationType = function (organizationId = 0) {
    alumniFactory.getCareerOrganizationType()
      .then(function (res) {
        $scope.organization = res.data;
        if (organizationId > 0) {
          let index = $scope.organization.findIndex(value => value.id == organizationId);
          $scope.params.organization_id = $scope.organization[index];
        }
      });
  }

  $scope.getNationalCountry = function (countryId = 0) {
    countryFactory.getCountry()
      .then(function (res) {
        $scope.NationalCountry = res.data;
        if (countryId > 0) {
          let index = $scope.NationalCountry.findIndex(value => value.id == countryId);
          $scope.params.national_id = $scope.NationalCountry[index];
        }
      });
  }

  $scope.getHomeCountry = function (countryId = 0) {
    countryFactory.getCountry()
      .then(function (res) {
        $scope.HomeCountry = res.data;
        if (countryId > 0) {
          let index = $scope.HomeCountry.findIndex(value => value.id == countryId);
          $scope.params.caption_home_id = $scope.HomeCountry[index];
        }
      });
  }

  $scope.getOfficeCountry = function (countryId = 0) {
    countryFactory.getCountry()
      .then(function (res) {
        $scope.country = res.data;
        if (countryId > 0) {
          let index = $scope.country.findIndex(value => value.id == countryId);
          $scope.params.caption_office_id = $scope.country[index];
        }
      });
  }
  
  $scope.getAlumniProfile();

}