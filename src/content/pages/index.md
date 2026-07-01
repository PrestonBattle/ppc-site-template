---
_schema: default
title: New Patient Special
description: >-
  Comprehensive dental care for the whole family. New patient specials and
  same-day appointments available.
pageSections:
  # ---------------------------------------------------------------- HERO
  - _component: page-sections/heroes/hero-split
    eyebrow: New Patients Welcome • Same-Day Appointments Available
    heading: Your City's Top-Rated Dental Experts
    subtext: >-
      Comprehensive dental care for the whole family. New patient specials
      available. Call us today to schedule.
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Book Appointment
        hideText: false
        link: "#contact"
        iconName: ''
        iconPosition: before
        variant: primary
        size: md
      - _component: building-blocks/core-elements/button
        text: "(555) 555-5555"
        hideText: false
        link: "tel:+15555555555"
        iconName: ''
        iconPosition: before
        variant: secondary
        size: md
    imageSource: /src/assets/images/placeholder-hero.jpg
    imageAlt: Our dental office
    reverse: false
    colorScheme: default
    backgroundColor: base

  # ------------------------------------------------------- WHY CHOOSE US
  - _component: page-sections/features/feature-grid
    eyebrow: Why Choose Us
    heading: 3 Great Reasons to Choose Us
    subtext: ''
    gap: xl
    minItemWidth: 280
    maxItemWidth: 360
    features:
      - _component: page-sections/features/feature-grid/feature-item
        title: New Patient Special
        description: >-
          New patients receive a special offer on their first visit. Ask us
          for details when you call.
        iconName: bolt
        iconColor: blue
      - _component: page-sections/features/feature-grid/feature-item
        title: Comprehensive Exam and X-Rays
        description: >-
          Thorough evaluation of your teeth, gums, and jaw using the latest
          digital technology.
        iconName: cube
        iconColor: green
      - _component: page-sections/features/feature-grid/feature-item
        title: Flexible Scheduling
        description: >-
          Early morning, evening, and same-day appointments available to fit
          your busy schedule.
        iconName: paint-brush
        iconColor: yellow
    colorScheme: default
    backgroundColor: surface
    align: center

  # ---------------------------------------------------- YOUR FIRST VISIT
  - _component: page-sections/features/feature-split
    eyebrow: Your First Visit
    heading: What Happens During Your First Visit
    subtext: >-
      We take time to get to know you and understand your dental needs. Here
      is what you can expect when you visit us for the first time.
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Book Your First Visit
        hideText: false
        link: "#contact"
        iconName: ''
        iconPosition: before
        variant: primary
        size: md
    imageSource: /src/assets/images/placeholder-office.jpg
    imageAlt: Doctor with patient
    reverse: true
    colorScheme: default
    backgroundColor: base

  # ----------------------------------------------------------- TESTIMONIAL
  - _component: page-sections/people/testimonial-section
    eyebrow: Top-Rated on Google
    heading: What Our Patients Say
    text: >-
      The team made my visit a breeze. From the first call to post-treatment,
      they were friendly, efficient, and caring.
    authorName: Happy Patient
    authorDescription: Verified Google Review
    colorScheme: default
    backgroundColor: surface

  # -------------------------------------------------------- CONTACT FORM
  - _component: page-sections/ctas/cta-form
    id: contact
    heading: Request Your Appointment
    subtext: >-
      Fill out the form below and our team will reach out to confirm your
      appointment, or call us directly.
    formAction: ./
    formBlocks:
      - _component: building-blocks/forms/input
        label: Full Name
        name: name
        type: text
        required: true
      - _component: building-blocks/forms/input
        label: Phone Number
        name: phone
        type: tel
        required: true
      - _component: building-blocks/forms/input
        label: Email
        name: email
        type: email
        required: false
      - _component: building-blocks/forms/submit
        text: Request Appointment
        variant: primary
        size: md
    imageSource: /src/assets/images/placeholder-team.jpg
    imageAlt: Our friendly team
    colorScheme: default
    backgroundColor: base

  # ---------------------------------------------------------- FINAL CTA
  - _component: page-sections/ctas/cta-center
    heading: Ready to Book Your Appointment?
    subtext: >-
      New patient specials available. Same-day appointments frequently
      available. Call us or book online today.
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Book Appointment
        hideText: false
        link: "#contact"
        iconName: ''
        iconPosition: before
        variant: primary
        size: md
      - _component: building-blocks/core-elements/button
        text: "(555) 555-5555"
        hideText: false
        link: "tel:+15555555555"
        iconName: ''
        iconPosition: before
        variant: tertiary
        size: md
    colorScheme: contrast
    backgroundColor: surface
    rounded: false
---
